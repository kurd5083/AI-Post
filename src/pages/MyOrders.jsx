import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router";

import PageHead from '@/components/PageHead'
import PageFilter from "@/components/PageFilter";
import TableMyOrders from "@/components/TableMyOrders";

import { usePromotionOrders } from "@/lib/promotion/usePromotionOrders";
import { useDebounce } from "@/lib/useDebounce";

import useSearchStore from "@/store/searchStore";

const MyOrders = () => {
  const { promotionOrders, promotionOrdersPending } = usePromotionOrders();

  const { searchQuery } = useSearchStore();
  const debouncedQuery = useDebounce(searchQuery, 500);

  const filteredOrders = promotionOrders?.filter(order => {
    if (!debouncedQuery.trim()) return true;

    const q = debouncedQuery.toLowerCase().trim();

    return order.link?.toLowerCase().includes(q)
  });
  return (
    <>
      <PageHead/>
      <PromotionHead>
				<Link to='/promotion'><PromotionHeadText>Продвижение</PromotionHeadText></Link>
				<PromotionHeadText $active={true}>Мои заказы</PromotionHeadText>
			</PromotionHead>
      <PageFilter
       
        placeholder="Поиск по заказам"
        filter={false}
      />
      <TableMyOrders promotionOrders={filteredOrders} promotionOrdersPending={promotionOrdersPending} debouncedQuery={debouncedQuery}/>
    </>
  )
}
const PromotionHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  scrollbar-width: none;
	padding: 0 56px;

  @media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const PromotionHeadText = styled.p`
  display: flex;
  gap: 32px;
  color: ${({ $active }) => $active ? '#D6DCEC' : '#6A7080'};
  padding-bottom: 32px;
  border-bottom: 2px solid ${({ $active }) => $active ? '#D6DCEC' : '#2E3954'};
  font-weight: 700;
  font-size: 24px;
  padding-right: 40px;
  cursor: pointer;
    
	@media(max-width: 480px) {
    padding-right: 0;
  }
`
export default MyOrders