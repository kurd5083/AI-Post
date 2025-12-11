import { useState } from "react";

import styled from "styled-components";
import PageHead from '@/components/PageHead'
import { Link } from "react-router";
import PageFilter from "@/components/PageFilter";
import TableMyOrders from "@/components/TableMyOrders";
const MyOrders = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  return (
    <>
      <PageHead/>
      <PromotionHead>
				<Link to='/promotion'><PromotionHeadText>Продвижение</PromotionHeadText></Link>
				<PromotionHeadText $active={true}>Подписки</PromotionHeadText>
			</PromotionHead>
      <PageFilter
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        placeholder="Поиск по заказам"
      />
      <TableMyOrders/>
    </>
  )
}
const PromotionHead = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
	padding: 0 24px;
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