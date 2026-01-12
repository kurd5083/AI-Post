import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import CardAddPost from "@/components/CardAddPost";
import { usePopupStore } from "@/store/popupStore";
import { usePostsByChannel } from "@/lib/posts/usePostsByChannel";
import { useUserChannels } from "@/lib/channels/useUserChannels";
import ModernLoading from "@/components/ModernLoading";
import CustomSelectSec from "@/shared/CustomSelectSec";

const itemsPerPageDefault = 9;
const itemsPerPageSmall = 6;
const itemsPerPageMob = 4;

const AddPostPopup = () => {
	const { popup } = usePopupStore();
	const { userChannels } = useUserChannels();

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);

	const [dateFilter, setDateFilter] = useState({
		period: "all",
		value: null,
	});

	const channelId = popup?.data?.channelId;
	const { posts, loadingPosts } = usePostsByChannel(channelId);

	const selectedChannel = userChannels.find(c => c.id === channelId);

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


	const filteredPosts = useMemo(() => {
		if (!posts) return [];
		const now = new Date();
		let result = [...posts];

		result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

		switch (dateFilter.period) {
			case "year":
				if (dateFilter.value) {
					result = result.filter(
						(p) => new Date(p.createdAt).getUTCFullYear() === dateFilter.value
					);
				}
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
					const now = new Date();
					const threshold = new Date(now.getTime() - dateFilter.value * 24 * 60 * 60 * 1000);

					result = result.filter((p) => new Date(p.createdAt) >= threshold);
				}
				break;

			default:
				break;
		}

		return result;
	}, [posts, dateFilter]);

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

	const getPaginationRange = (current, total, max = 3) => {
		if (total <= max) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

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
			<PublicationsHead
				spaceBetween={64}
				slidesPerView="auto"
				grabCursor
			>
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
						width="320px"
						fs="24px"
					/>
				)}
			</PublicationsHead>

			{!loadingPosts && channelId ? (
				<>
					<PublicationsList>
						{currentItems.length > 0 ? (
							currentItems.map((item) =>

								<CardAddPost key={item.id} item={item} bg selectedChannel={selectedChannel} />
							)
						) : (
							<EmptyState>Постов пока нет</EmptyState>
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

const PublicationsHead = styled.div`
  display: flex;
  gap: 64px;
  padding: 0 56px;

  @media (max-width: 1600px) {
    padding: 0 32px;
  }
  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const PublicationsList = styled.div`
  display: grid;
  margin-top: 50px;
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

export default AddPostPopup;