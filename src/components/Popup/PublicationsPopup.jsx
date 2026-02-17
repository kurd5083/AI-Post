import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import CardPablish from "@/components/Cards/CardPablish";
import CardPablishPremoderation from "@/components/Cards/CardPablishPremoderation";
import CardArhive from "@/components/Cards/CardArhive";
import ModernLoading from "@/components/ModernLoading";
import Empty from "@/shared/Empty";

import CustomSelectSec from "@/shared/CustomSelectSec";

import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import { useGetArchivedPosts } from "@/lib/posts/useGetArchivedPosts";

import { usePopupStore } from "@/store/popupStore";
import { usePublicationsStore } from "@/store/publicationsStore";

const itemsPerPageDefault = 9;
const itemsPerPageSmall = 6;
const itemsPerPageMob = 4;

const PublicationsPopup = () => {
  const { popup } = usePopupStore();
  const { userChannels } = useUserChannels();
  const channelId = popup?.data?.channelId;

  const filter = usePublicationsStore((state) => state.filter);
  const dateFilter = usePublicationsStore((state) => state.dateFilter);
  const currentPage = usePublicationsStore((state) => state.currentPage);
  const setFilter = usePublicationsStore((state) => state.setFilter);
  const setDateFilter = usePublicationsStore((state) => state.setDateFilter);
  const setCurrentPage = usePublicationsStore((state) => state.setCurrentPage);

  const { posts, pendingPosts } = usePostsByChannel({channelId});
  const { postsArchived } = useGetArchivedPosts(channelId);
  const selectedChannel = userChannels.find((c) => c.id === channelId);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

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

  const basePosts = useMemo(() => {
    if (filter === "archive") return postsArchived || [];
    if (filter === "premoderation")
      return posts?.filter((p) => p.status === "PENDING_MODERATION") || [];
    return posts || [];
  }, [filter, posts, postsArchived]);

  const filteredPostsByDate = useMemo(() => {
    if (!basePosts) return [];
    let result = [...basePosts];
    const now = new Date();

    switch (dateFilter.period) {
      case "year":
        if (dateFilter.value)
          result = result.filter(
            (p) => new Date(p.createdAt).getUTCFullYear() === dateFilter.value
          );
        break;
      case "month":
        if (dateFilter.value) {
          const { year, month } = dateFilter.value;
          result = result.filter((p) => {
            const d = new Date(p.createdAt);
            return d.getUTCFullYear() === year && d.getUTCMonth() === month;
          });
        }
        break;
      case "week":
        if (dateFilter.value) {
          const threshold = new Date(
            now.getTime() - dateFilter.value * 24 * 60 * 60 * 1000
          );
          result = result.filter((p) => new Date(p.createdAt) >= threshold);
        }
        break;
    }

    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return result;
  }, [basePosts, dateFilter]);

  const filterByDate = (postsArray) => {
    if (!postsArray) return [];
    let result = [...postsArray];
    const now = new Date();

    switch (dateFilter.period) {
      case "year":
        if (dateFilter.value)
          result = result.filter(
            (p) => new Date(p.createdAt).getUTCFullYear() === dateFilter.value
          );
        break;
      case "month":
        if (dateFilter.value) {
          const { year, month } = dateFilter.value;
          result = result.filter((p) => {
            const d = new Date(p.createdAt);
            return d.getUTCFullYear() === year && d.getUTCMonth() === month;
          });
        }
        break;
      case "week":
        if (dateFilter.value) {
          const threshold = new Date(
            now.getTime() - dateFilter.value * 24 * 60 * 60 * 1000
          );
          result = result.filter((p) => new Date(p.createdAt) >= threshold);
        }
        break;
    }

    return result;
  };

  const filteredAllPosts = useMemo(() => filterByDate(posts), [posts, dateFilter]);
  const filteredPremoderation = useMemo(
    () => filterByDate(posts?.filter((p) => p.status === "PENDING_MODERATION")),
    [posts, dateFilter]
  );
  const filteredArchived = useMemo(() => filterByDate(postsArchived), [postsArchived, dateFilter]);
  const allPostsCount = filteredAllPosts.length;
  const allPremoderationCount = filteredPremoderation.length;
  const allArchivedCount = filteredArchived.length;

  const totalPages = Math.ceil(filteredPostsByDate.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredPostsByDate.slice(indexOfFirst, indexOfLast);

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
  const getPaginationRange = (current, total, max = 3) => {
    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);
    const half = Math.floor(max / 2);
    let start = Math.max(current - half, 1);
    let end = start + max - 1;
    if (end > total) {
      end = total;
      start = end - max + 1;
    }
    return Array.from({ length: max }, (_, i) => start + i);
  };

  return (
    <>
      <PublicationsHead spaceBetween={64} slidesPerView="auto" grabCursor>
        <SwiperSlideHead>
          <PublicationsFilter
            $active={filter === "common"}
            onClick={() => setFilter("common")}
          >
            Общие посты <span>{allPostsCount}</span>
          </PublicationsFilter>
        </SwiperSlideHead>

        <SwiperSlideHead>
          <PublicationsFilter
            $active={filter === "premoderation"}
            onClick={() => setFilter("premoderation")}
          >
            Премодерация <span>{allPremoderationCount}</span>
          </PublicationsFilter>
        </SwiperSlideHead>

        <SwiperSlideHead>
          <PublicationsFilter
            $active={filter === "archive"}
            onClick={() => setFilter("archive")}
          >
            Архив <span>{allArchivedCount}</span>
          </PublicationsFilter>
        </SwiperSlideHead>

        <SwiperSlideHead>
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

        </SwiperSlideHead>

        {dateFilter.period !== "all" && (
          <SwiperSlideHead>
            <CustomSelectSec
              placeholder="Уточнить"
              value={dateFilter.value}
              options={dateValueOptions}
              onChange={(option) => {
                setDateFilter((prev) => ({ ...prev, value: option.value }))
              }
              }
              width="320px"
              fs="24px"
            />
          </SwiperSlideHead>
        )}
      </PublicationsHead>

      {!pendingPosts && channelId ? (
        <>
          <PublicationsList>
            {currentItems.length > 0 ? (
              currentItems.map((item) =>
                filter === "premoderation" ? (
                  <CardPablishPremoderation
                    key={item.id}
                    item={item}
                    channelId={channelId}
                    selectedChannel={selectedChannel}
                  />
                ) : filter === "archive" ? (
                  <CardArhive
                    key={item.id}
                    item={item}
                    channelId={channelId}
                    selectedChannel={selectedChannel}
                  />
                ) : (
                  <CardPablish
                    key={item.id}
                    item={item}
                    bg
                    selectedChannel={selectedChannel}
                  />
                )
              )
            ) : (
              <EmptyContainer>
                <Empty icon="📝">
                  {filter === "premoderation"
                    ? "Постов на премодерации пока нет"
                    : filter === "archive"
                      ? "Архивных постов пока нет"
                      : "Постов пока нет"}
                </Empty>
              </EmptyContainer>
            )}
          </PublicationsList>

          {totalPages > 1 && (
            <PaginationWrapper>
              {currentPage > 1 && (
                <PageBtn onClick={() => setCurrentPage(currentPage - 1)}>
                  ←
                </PageBtn>
              )}

              {currentPage > 3 && (
                <>
                  <PageBtn onClick={() => setCurrentPage(1)}>1</PageBtn>
                  <span>…</span>
                </>
              )}

              {getPaginationRange(currentPage, totalPages).map((page) => (
                <PageBtn
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  active={currentPage === page}
                >
                  {page}
                </PageBtn>
              ))}

              {currentPage < totalPages - 2 && (
                <>
                  <span>…</span>
                  <PageBtn onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                  </PageBtn>
                </>
              )}

              {currentPage < totalPages && (
                <PageBtn onClick={() => setCurrentPage(currentPage + 1)}>
                  →
                </PageBtn>
              )}
            </PaginationWrapper>
          )}
        </>
      ) : (
        <ModernLoading text="Загрузка публикаций..." />
      )}
    </>
  );
};

const PublicationsHead = styled(Swiper)`
  display: flex;
  padding: 0 56px;
  min-height: max-content;
  margin: 0;
  overflow: visible !important;

  @media (max-width: 1600px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;
const SwiperSlideHead = styled(SwiperSlide)`
  width: fit-content;
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
  margin-top: 40px;
  gap: 16px 24px;
  padding: 0 56px ;
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
const EmptyContainer = styled.p`
  grid-column: 1 / span 3;
`;
const PaginationWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 24px;
  padding-top: 40px;
  padding-bottom: 30px;
`;

const PageBtn = styled.button`
  font-size: 12px;
  color: ${(props) => (props.active ? "#D6DCEC" : "#6A7080")};

  &:hover {
    color: #D6DCEC;
  }
`;

export default PublicationsPopup;