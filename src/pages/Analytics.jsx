import PageHead from '@/components/PageHead'
import styled from "styled-components";
import { Link } from 'react-router';
import eye from "@/assets/analytics/eye.svg";
import internet from "@/assets/analytics/internet.svg";
import ava_icon from "@/assets/ava-icon.png";
import total_number from "@/assets/analytics/total-number.svg";
import copying_forwarding from "@/assets/analytics/copying-forwarding.svg";
import gender from "@/assets/analytics/gender.svg";
import forwarding from "@/assets/analytics/forwarding.svg";
import premium from "@/assets/analytics/premium.svg";
import { AdvertisingStatistics } from '@/data/AdvertisingStatistics';

const Analytics = () => {
	return (
		<>
			<PageHead />
			<AnalyticsBlocks>
				<AnalyticsBlock>
					<AnalyticsBlockTop>
						<AnalyticsBlockAvaContainer>
							<AnalyticsBlockAva src={ava_icon} alt="ava icon" width={80} height={80} />
							<p>№ 35</p>
						</AnalyticsBlockAvaContainer>
						<AnalyticsBlockInfo>
							<h3>Antropia Digital</h3>
							<AnalyticsBlockUl>
								<li>стиль</li>
								<li>качество</li>
								<li>дизайн</li>
							</AnalyticsBlockUl>
							<div>
								<p>Реклама: <Link to="/" target="_new">@antropia digital</Link></p>
								<p>Прислать свой дизайн: <Link to="/" target="_new">@antropia_send</Link></p>
							</div>
						</AnalyticsBlockInfo>
					</AnalyticsBlockTop>
					<AnalyticsBlockBottom>
						<p><img src={internet} alt="internet icon" />Русский</p>
						<p><img src={eye} alt="eye icon" />350</p>
					</AnalyticsBlockBottom>
				</AnalyticsBlock>
				<AnalyticsBlock></AnalyticsBlock>
				<AnalyticsBlock></AnalyticsBlock>
			</AnalyticsBlocks>
			<AnalyticsInfos>
				<AnalyticsInfo>
					<h3>Общее количество</h3>
					<p><img src={total_number} alt="total number icon" />Подключить сейчас</p>
				</AnalyticsInfo>
				<AnalyticsInfo>
					<h3>Копированиие и пересылка контента</h3>
					<p><img src={copying_forwarding} alt="copying forwarding icon" />Разрешено</p>
				</AnalyticsInfo>
				<AnalyticsInfo>
					<h3>Пол аудитории</h3>
					<p><img src={gender} alt="gender icon" />N / A</p>
				</AnalyticsInfo>
				<AnalyticsInfo>
					<h3>Пересылка постов (в среднем)</h3>
					<p><img src={forwarding} alt="forwarding icon" />3.188</p>
				</AnalyticsInfo>
				<AnalyticsInfo>
					<h3>Premium пользователей</h3>
					<p><img src={premium} alt="premium icon" />13.255</p>
				</AnalyticsInfo>
			</AnalyticsInfos>
			<Statistics>
				<TableContainer>
							<TableWrapper>
								<Table>
									<colgroup>
										<col />
										<col />
										<col />
									</colgroup>
									<TableHead>
										<tr>
											<HeaderCell>Время</HeaderCell>
											<HeaderCell>Подписчиков</HeaderCell>
											<HeaderCell>Прирост</HeaderCell>
										</tr>
									</TableHead>
									<TableBody>
										{AdvertisingStatistics.map((item) => (
											<TableItem key={item.id}>
												<TableCell>{item.time}</TableCell>
												<TableCell>{item.subscribers}</TableCell>
												<TableCell>{item.growth}</TableCell>
											</TableItem>
										))}
									</TableBody>
								</Table>
							</TableWrapper>
						</TableContainer>
			</Statistics>
		</>
	)
}
const AnalyticsBlocks = styled.section`
  display: flex;
  gap: 16px;
	padding: 0 clamp(0px, calc((100vw - 1600px) * 24 / 400), 24px);
`
const AnalyticsBlock = styled.div`
	box-sizing: border-box;
	padding: 32px;
  background-color: #181F30;
  border-radius: 24px;
  flex: 1;
`
const AnalyticsBlockTop = styled.div`
	display: flex;
	gap: 32px;
`
const AnalyticsBlockAvaContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
`

const AnalyticsBlockAva = styled.img`
	border-radius: 16px;
`
const AnalyticsBlockInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;
	h3 {
		font-weight: 700;
		font-size: 32px;
		line-height: 36px;
	}
	p {
		font-size: 14px;
		font-weight: 600;
		color: #6A7080;
		a {
			color: #336CFF;
		}
	}
`
const AnalyticsBlockUl = styled.ul`
	display: flex;
	gap: 8px;
	
	li {
		padding: 16px;
		border-radius: 12px;
		color: #AC60FD;
		background-color: #242440;
		font-size: 14px;
		font-weight: 700;
	}
`

const AnalyticsBlockBottom = styled.div`
	margin-top: 40px;
	display: flex;
	justify-content: space-between;
	p {
		display: flex;
		align-items: center;
		gap: 16px;
		font-size: 14px;
		font-weight: 700;
		&:first-child {
			color: #6A7080;
		}
	}
`
const AnalyticsInfos = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 48px;
	padding: 0 clamp(0px, calc((100vw - 1600px) * 24 / 400), 24px);
`
const AnalyticsInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
	h3 {
		font-size: 14px;
		font-weight: 700;
		color: #6A7080;
	}
	p {
		display: flex;
		align-items: center;
		font-size: 24px;
		line-height: 24px;
		font-weight: 700;
		gap: 16px;
	}
`
const Statistics = styled.div`
`

const TableContainer = styled.div`
  position: relative;
  margin-top: 20px;
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
    @media (max-width: 768px) {
    padding: 0;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: calc(100svh - 600px); 
  min-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  table-layout: fixed;
`;

const TableHead = styled.thead`
  th:first-child {
    padding-left: 24px;
  }
  th:last-child {
    padding-right: 24px;
  }
`;

const HeaderCell = styled.th`
  text-align: left;
  font-weight: 700;
  color: #6A7080;
  font-size: 12px;
  text-transform: uppercase;
  position: sticky;
  top: 0px;
  z-index: 2;
  padding: 20px 0;
  background-color: #131826;
`;

const TableBody = styled.tbody``;

const TableItem = styled.tr`
  transition: background .15s ease;
  
  @media(max-width: 768px) {
    &:last-child {
      td {
        border-bottom: 0;
      }
    }
    }
  
  td {
    border-bottom: 2px solid #1F273B;
    border-radius: 0 !important; 
    padding: 30px 0;
  }
        
  td:first-child {
    border-radius: 24px 0 0 24px;
    padding-left: 24px;
    padding-right: 10px;
  }

  td:last-child {
    border-radius: 0 24px 24px 0;
    padding-right: 24px;
  }

  &:hover {
    background-color: #1C2438;
  }
`;

const TableCell = styled.td`
  font-size: 14px;


`;

export default Analytics
