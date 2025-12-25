import { useState, useEffect } from "react";
import styled from "styled-components";
import CardPablish from "@/components/CardPablish";
import { usePopupStore } from "@/store/popupStore"
import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";
import ModernLoading from "@/components/ModernLoading";

const itemsPerPageDefault = 9;
const itemsPerPageSmall = 6;
const itemsPerPageMob = 4;

const PublicationsPopup = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

  const { popup } = usePopupStore();
  const channelId = popup?.data?.channelId;

  const { posts, loadingPosts } = usePostsByChannel(channelId);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(itemsPerPageMob);
      } else if (window.innerWidth < 1600) {
        setItemsPerPage(itemsPerPageSmall);
      } else {
        setItemsPerPage(itemsPerPageDefault);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const totalPages = posts?.length ? Math.ceil(posts.length / itemsPerPage) : 0;
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = posts?.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <PublicationsHead>
        <PublicationsFilter>Все</PublicationsFilter>
        <PublicationsFilter>Архив <span>0</span></PublicationsFilter>
        <PublicationsFilter>По дате</PublicationsFilter>
      </PublicationsHead>
      {!loadingPosts ? (
        <>
          <PublicationsList>
            {currentItems?.length > 0 ? (
              currentItems?.map((item) => (
                <CardPablish key={item.id} item={item} bg />
              ))
            ) : (
              <EmptyState>Публикаций пока нет</EmptyState>
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
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;
const PublicationsFilter = styled.p`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 32px;
  border-bottom: 2px solid #2e3954;
  width: max-content !important;
  font-size: 24px;
  font-weight: 700;
  color: #6a7080;
  flex-shrink: 0;
    
  span {
    color: #6a7080;
  }
`;
const PublicationsList = styled.div`
  display: grid;
  grid-template-rows: max-content;
  margin-top: 50px;
  gap: 16px 24px;
  padding: 0 56px;
  grid-template-columns: repeat(3, 1fr);
  
  @media(max-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0 32px;
  }
   @media(max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 991px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media(max-width: 768px) {
    padding: 0 24px;
    grid-template-columns: 1fr;
  }
`;
const EmptyState = styled.p`
  text-align: center;
  font-size: 14px;
  color: #6a7080;
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
