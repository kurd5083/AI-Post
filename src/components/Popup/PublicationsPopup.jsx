import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import CardPablish from "@/components/CardPablish";
import CardPablishPremoderation from "@/components/CardPablishPremoderation";
import { usePopupStore } from "@/store/popupStore";
import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";
import ModernLoading from "@/components/ModernLoading";
import CustomSelectSec from "@/shared/CustomSelectSec";

const itemsPerPageDefault = 9;
const itemsPerPageSmall = 6;
const itemsPerPageMob = 4;

const PublicationsPopup = () => {
  const { popup } = usePopupStore();
  const initialFilter = popup?.data?.filter || "common";

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);
  const [filter, setFilter] = useState(initialFilter);

  const [dateFilter, setDateFilter] = useState({
    period: "all",
    value: null,
  });

  const channelId = popup?.data?.channelId;
  const { posts, loadingPosts } = usePostsByChannel(channelId);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(itemsPerPageMob);
      else if (window.innerWidth < 1600) setItemsPerPage(itemsPerPageSmall);
      else setItemsPerPage(itemsPerPageDefault);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setCurrentPage(1), [dateFilter]);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const now = new Date();
    let result = [...posts];

    switch (dateFilter.period) {
      case "year":
        if (dateFilter.value) {
          result = result.filter(
            (p) => new Date(p.publishedAt).getFullYear() === dateFilter.value
          );
        }
        break;
      case "month":
        if (dateFilter.value) {
          result = result.filter((p) => {
            const postDate = new Date(p.publishedAt);
            return (
              postDate.getFullYear() === dateFilter.value.year &&
              postDate.getMonth() === dateFilter.value.month
            );
          });
        }
        break;
      case "week":
        if (dateFilter.value) {
          const threshold = new Date();
          threshold.setDate(now.getDate() - dateFilter.value);
          result = result.filter((p) => new Date(p.publishedAt) >= threshold);
        }
        break;
      default:
        break;
    }

    if (filter === "premoderation") {
      result = result.filter((p) => p.status === "PENDING_MODERATION");
    }

    return result;
  }, [posts, dateFilter, filter]);

  const totalPages = filteredPosts.length
    ? Math.ceil(filteredPosts.length / itemsPerPage)
    : 0;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPosts.slice(indexOfFirst, indexOfLast);

  const dateValueOptions = useMemo(() => {
    const now = new Date();

    if (dateFilter.period === "year") {
      const currentYear = now.getFullYear();
      return Array.from({ length: 5 }, (_, i) => {
        const year = currentYear - i;
        return { value: year, label: year.toString() };
      });
    }

    if (dateFilter.period === "month") {
      const year = now.getFullYear();
      return Array.from({ length: 12 }, (_, i) => ({
        value: { year, month: i },
        label: new Date(year, i).toLocaleString("ru", { month: "long" }),
      }));
    }

    if (dateFilter.period === "week") {
      return [
        { value: 7, label: "Последние 7 дней" },
        { value: 14, label: "Последние 14 дней" },
        { value: 21, label: "Последние 21 день" },
      ];
    }

    return [];
  }, [dateFilter.period]);

  return (
    <>
      <PublicationsHead>
        <PublicationsFilter
          $active={filter === "common"}
          onClick={() => setFilter("common")}
        >
          Общие посты <span>{posts?.filter(p => p.status !== "PENDING_MODERATION").length || 0}</span>
        </PublicationsFilter>
        <PublicationsFilter
          $active={filter === "premoderation"}
          onClick={() => setFilter("premoderation")}
        >
          Премодерация <span>{posts?.filter(p => p.status === "PENDING_MODERATION").length || 0}</span>
        </PublicationsFilter>

        <CustomSelectSec
          placeholder="Выбор даты"
          value={dateFilter.period}
          options={[
            { value: "all", label: "Все даты" },
            { value: "year", label: "За год" },
            { value: "month", label: "За месяц" },
            { value: "week", label: "За неделю" },
          ]}
          onChange={(option) =>
            setDateFilter({ period: option.value, value: null })
          }
          width="250px"
          fs="24px"
        />

        {dateFilter.period !== "all" && (
          <CustomSelectSec
            placeholder="Уточнить"
            value={dateFilter.value}
            options={dateValueOptions}
            onChange={(option) =>
              setDateFilter((prev) => ({ ...prev, value: option.value }))
            }
            width="220px"
            fs="24px"
          />
        )}
      </PublicationsHead>

      {!loadingPosts && channelId ? (
        <>
          <PublicationsList>
            {currentItems.length > 0 ? (
              currentItems.map((item) =>
                filter === "premoderation" ? (
                  <CardPablishPremoderation key={item.id} item={item} channelId={channelId} />
                ) : (
                  <CardPablish key={item.id} item={item} bg />
                )
              )
            ) : (
              <EmptyState>
                {filter === "premoderation" ? "Постов на премодерации пока нет" : "Постов пока нет"}
              </EmptyState>
            )}
          </PublicationsList>

          {totalPages > 1 && (
            <PaginationWrapper>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageBtn
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  active={currentPage === i + 1}
                >
                  {i + 1}
                </PageBtn>
              ))}
            </PaginationWrapper>
          )}
        </>
      ) : (
        <ModernLoading text="Загрузка публикаций..." />
      )}
    </>
  );
};

const PublicationsHead = styled.div`
  display: flex;
  gap: 64px;
  scrollbar-width: none;
  padding: 0 56px;

  @media (max-width: 1600px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const PublicationsFilter = styled.p`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 32px;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "#D6DCEC" : "#2e3954")};
  width: max-content !important;
  font-size: 24px;
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#D6DCEC" : "#6a7080")};
  flex-shrink: 0;
  cursor: pointer;
  transition: color 0.2s, border-color 0.2s;

  span {
    color: inherit;
  }
`;

const PublicationsList = styled.div`
  display: grid;
  margin-top: 50px;
  gap: 16px 24px;
  padding: 0 56px;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 32px;
  }
  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    padding: 0 24px;
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: #6A7080;
  padding: 48px 0;
  font-weight: 600;
  background-color: #1C2438;
  border-radius: 16px;
  grid-column: 1 / span 3;
`;

const PaginationWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 37px;
  padding-top: 40px;
`;

const PageBtn = styled.button`
  font-size: 12px;
  color: ${(props) => (props.active ? "#D6DCEC" : "#6A7080")};

  &:hover {
    color: #D6DCEC;
  }
`;

export default PublicationsPopup;