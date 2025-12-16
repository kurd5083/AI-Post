import styled from "styled-components";
import PageHead from '@/components/PageHead'
import AnalyticsBlocks from "@/components/Analytics/AnalyticsBlocks";
import total_number from "@/assets/analytics/total-number.svg";
import copying_forwarding from "@/assets/analytics/copying-forwarding.svg";
import gender from "@/assets/analytics/gender.svg";
import forwarding from "@/assets/analytics/forwarding.svg";
import premium from "@/assets/analytics/premium.svg";
import ava_icon from "@/assets/ava-icon.png";
import { advertisingStatisticsDatas } from '@/data/advertisingStatisticsDatas';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
	const data = {
    labels: [
			'',
      '2025/11.05',
			'',
      '2025/21.05',
			'',
      '2025/31.05',
			'',
      '2025/11.06',
			'',
    ],
    datasets: [
      {
        label: 'Подписчиков по дням',
        data: [4, 5, 6, 2, 1.5, 3, 1.2, 5, 7],
        borderColor: '#336CFF',
        backgroundColor: '#fff',
        tension: 0,
				pointRadius: 0,  
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 1,
        max: 7,
        ticks: {
          callback: function (value) {
            return value + ' млн';
          },
          color: '#6A7080',
					stepSize: 2,
					padding: 30, 
					font: {
						size: 14,      
						weight: 700, 
    			},
        },
        grid: {
          color: '#2e2e3e',
        },
      },
      x: {
        ticks: {
          color: '#6A7080',
					padding: 30, 
					font: {
						size: 14,      
						weight: 700, 
    			},
        },
        grid: {
					display: false,
				}
      },
    },
  };
	return (
		<AnalyticsContainer>
			<PageHead />
			<AnalyticsBlocks/>
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
					<TableTitle>Рекламная статистика</TableTitle>
					<TableWrapper>
						<Table>
							<colgroup>
								<col />
								<col />
								<col />
							</colgroup>
							<thead>
								<tr>
									<HeaderCell>Время</HeaderCell>
									<HeaderCell>Подписчиков</HeaderCell>
									<HeaderCell>Прирост</HeaderCell>
								</tr>
							</thead>
							<tbody>
								{advertisingStatisticsDatas.map((item) => (
									<TableItem key={item.id}>
										<TableCell>{item.time}</TableCell>
										<TableCell>{item.subscribers}</TableCell>
										<TableCell>{item.growth}</TableCell>
									</TableItem>
								))}
							</tbody>
						</Table>
					</TableWrapper>
				</TableContainer>
				<StatisticsChart>
					<StatisticsHead>
						<img src={ava_icon} alt="ava icon" width={40} height={40}/>
						<TitleStyled>Подписчиков по дням</TitleStyled>
					</StatisticsHead>
					<Line data={data} options={options} height={110}/>
				</StatisticsChart>
			</Statistics>
		</AnalyticsContainer>
	)
}

const AnalyticsContainer = styled.div`
`
const AnalyticsInfos = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 48px;
	padding: 0 56px;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
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
	display: flex;
	margin-top: 64px;
	gap: 90px;
  padding: 0 56px;
	align-items: flex-start;

	@media(max-width: 1600px) {
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`
const TableContainer = styled.div`
	width: calc(50% - 90px);
  position: relative;
  margin-top: 48px;
`;
const TableTitle = styled.h2`
  margin-bottom: 40px;
	font-size: 32px;
	line-height: 32px;
	font-weight: 700;
`;
const TableWrapper = styled.div`
  width: 100%;
  max-height: 250px; 
  overflow-y: auto;
  scrollbar-width: none;
`;
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1px;
  table-layout: fixed;
	& colgroup col:first-child {
    width: 50%;
  }
  & colgroup col:nth-child(2) {
    width: calc(50% - 70px);
  }
  & colgroup col:nth-child(3) {
    width: 70px;
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
  padding: 30px 0;
  background-color: #131826;
`;
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
    padding: 30px 0;
  }

  &:hover {
    background-color: #1C2438;
  }
`;
const TableCell = styled.td`
  font-size: 14px;
	font-weight: 700;

	&:last-child {
		color: #B5EC5B;
	}
`;
const StatisticsChart = styled.div`
	width: 50%;
  background-color: #181F30;
  border-radius: 24px;
`;
const StatisticsHead = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 32px 32px 0;

	img {
		border-radius: 50%;
	}
`;

const TitleStyled = styled.h2`
  font-size: 24px;
	font-weight: 700;
`;

export default Analytics