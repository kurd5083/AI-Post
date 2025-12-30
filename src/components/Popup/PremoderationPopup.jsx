import React from 'react'

const PremoderationPopup = () => {
	return (
		<>
			<PublicationsHead>
				<PublicationsFilter $active={filter === ""} onClick={() => setFilter("archive")}>
					Общие посты <span>{posts?.filter(p => p.archived).length || 0}</span>
				</PublicationsFilter>
				<PublicationsFilter $active={filter === ""} onClick={() => setFilter("archive")}>
					Премодерация <span>{posts?.filter(p => p.archived).length || 0}</span>
				</PublicationsFilter>
				<CustomSelectSec
					placeholder="Выбор даты"
					value={filter}
					onChange={(option) => setFilter(option.value)}
					options={[
						{ label: "Сначала новые", value: "date" },
						{ label: "Сначала старые", value: "old" }
					]}
					width="250px"
					fs="24px"
				/>
			</PublicationsHead>
			{!loadingPosts && channelId ? (
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
	)
}

const PublicationsHead = styled.div`
  display: flex;
  gap: 64px;
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
  cursor: pointer;
    
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

export default PremoderationPopup
