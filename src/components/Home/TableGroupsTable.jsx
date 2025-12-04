import { useRef, useState } from "react";
import styled from 'styled-components';
import dir_white from "@/assets/TableGroups/dir-white.svg";
import del from "@/assets/TableGroups/del.svg";
import setting from "@/assets/setting.svg";
import list from "@/assets/TableGroups/list.svg";
import { usePopupStore } from "@/store/popupStore"
import { tabledata } from "@/data/tabledata";
import useResolution from "@/lib/useResolution";

const TableGroupsTable = () => {
	const wrapperRef = useRef(null);
	const [fadeVisible, setFadeVisible] = useState(true);
	const { openPopup } = usePopupStore();
	const { isSmall } = useResolution();

	const handleScroll = () => {
		const el = wrapperRef.current;
		if (!el) return;

		const isEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 50;
		setFadeVisible(!isEnd);
	};

	return (
		<TableContainer fadeVisible={fadeVisible}>
			<TableWrapper ref={wrapperRef} onScroll={handleScroll}>
				<Table>
					<colgroup>
						<col />
						<col />
						<col />
						<col />
					</colgroup>
					<TableHead>
						<tr>
							<HeaderCell>Название группы</HeaderCell>
							<HeaderCell>Список</HeaderCell>
							<HeaderCell>Статус</HeaderCell>
							<HeaderCell>Параметры</HeaderCell>
						</tr>
					</TableHead>
					<TableBody>
						{tabledata.map((row) => (
							<TableItem key={row.id}>
								<TableCell>
									<p>
										<TableCellNum>{row.number}</TableCellNum>
										<img src={row.image} alt="Group" />
										<span>{row.name}</span>
									</p>
								</TableCell>
								<TableCell>
									<TableCellStatus>{isSmall ? 'Премодерация' : row.status}</TableCellStatus>
								</TableCell>
								<TableCell>
									<TableCellOnline $online={row.online}>
										<StatusIndicator $online={row.online} />
										{row.online ? 'Онлайн' : 'Ошибка'}
									</TableCellOnline>
								</TableCell>
								<TableCell>
									<ButtonsWrap>
										<ButtonList title="Список"><img src={list} alt="list icon" width={16} height={16} /></ButtonList>
										<ButtonDir title="Перейти"><img src={dir_white} alt="dir icon" width={16} height={13} /></ButtonDir>
										<ButtonSetting onClick={() => openPopup()} title="Настройки"><img src={setting} alt="setting icon" width={16} height={16} /></ButtonSetting>
										<ButtonDel title="Удалить"><img src={del} alt="del icon" width={14} height={16} /></ButtonDel>
									</ButtonsWrap>
								</TableCell>
							</TableItem>
						))}
					</TableBody>
				</Table>
			</TableWrapper>
		</TableContainer>
	);
};

export default TableGroupsTable;

const TableContainer = styled.div`
  position: relative;
  margin-top: 20px;
  @media (max-width: 1600px) {
    padding: 0 32px;
  }
	@media (max-width: 768px) {
    padding: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    height: 135px;
    width: 100%;
    background: linear-gradient(to top, #131826, transparent);
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, black 50%, transparent);
    transition: opacity 0.2s;
    opacity: ${props => props.fadeVisible ? 1 : 0};
    pointer-events: none;

    @media(max-width: 1400px) {
      display: none;
    }
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  max-height: calc(100vh - 600px); 
  min-height: 400px;
  overflow-y: auto;
  scrollbar-width: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  table-layout: fixed;

	@media(max-width: 768px) {
		border-spacing: 0;
  }

  & colgroup col:first-child {
    width: 35%;
    @media(max-width: 991px) {
      width: 32%;
    }
		@media(max-width: 768px) {
			width: calc(100% - 250px);
  	}
		@media(max-width: 480px) {
			width: calc(100% - 195px);
  	}
  }
  & colgroup col:nth-child(2) {
    width: 30%;
    @media(max-width: 1600px) {
      width: 25%;
    }
		 @media(max-width: 991px) {
      width: 27%;
    }
		@media(max-width: 768px) {
			display: none;
  	}
  }
  & colgroup col:nth-child(3) {
    width: calc(35% - 200px);
    @media(max-width: 1600px) {
      width: calc(40% - 185px);
    }
		@media(max-width: 991px) {
      width: calc(40% - 170px);
    }
		@media(max-width: 768px) {
			display: none;
  	}
  }
  & colgroup col:last-child {
    width: 200px;
    @media(max-width: 1600px) {
      width: 185px;
    }
    @media(max-width: 991px) {
      width: 170px;
    }
		@media(max-width: 768px) {
			width: 250px;
  	}
		@media(max-width: 480px) {
			width: 195px;
  	}
  }
`;

const TableHead = styled.thead`
  th:first-child {
    padding-left: 24px;
  }
  th:last-child {
    padding-right: 24px;
  }
  @media(max-width: 1600px) {
    th:first-child {
      padding-left: 0px;
    }
    th:last-child {
      padding-right: 0px;
    }
  }
	@media(max-width: 768px) {
    th:first-child {
      padding-left: 32px;
    }
    th:last-child {
      padding-right: 32px;
    }
  }

	@media(max-width: 480px) {
		display: none;
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
  @media(max-width: 768px) {
    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
  }
`;

const TableBody = styled.tbody``;

const TableItem = styled.tr`
  transition: background .15s ease;

  td {
    padding: 15px 0;
		@media(max-width: 768px) {
			border-bottom: 2px solid #1F273B;
			border-radius: 0 !important; 
			padding: 30px 0;
		}
  }
        
  td:first-child {
    border-radius: 24px 0 0 24px;
    padding-left: 24px;
    padding-right: 10px;
		@media(max-width: 1600px) {
      padding-left: 8px;
  	}
		@media(max-width: 768px) {
			padding-left: 32px;
		}
		@media(max-width: 480px) {
			padding-left: 24px;
			span {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
  }

  td:last-child {
    border-radius: 0 24px 24px 0;
    padding-right: 24px;
		@media(max-width: 1600px) {
      padding-right: 8px;
  	}
		@media(max-width: 768px) {
			padding-right: 32px;
		}
		@media(max-width: 480px) {
			padding-right: 24px;
		}
  }

  &:hover {
    background-color: #1C2438;
  }
`;

const TableCell = styled.td`
  font-size: 14px;
  p {
    display: flex;
    align-items: center;
    font-weight: 700;
    margin: 0;
        
    img {
      margin: 0 24px 0 32px;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      object-fit: cover;
      @media(max-width: 991px) {
        margin: 0 10px 0 0;
      }
    }
  }
	@media(max-width: 768px) {
    &:nth-child(2), &:nth-child(3) {
      display: none;
    }
  }
`;
const TableCellNum = styled.span`
  @media(max-width: 991px) {
    display: none;
  }
`;

const TableCellStatus = styled.button`
  padding: 18px 24px;
  border-radius: 12px;
  color: #6A7080;
  border: 2px solid #1F273B;
  font-size: 14px;
  font-weight: 700;
  background: transparent;
  &:hover {
    background-color: #336CFF;
    color: #fff;
  }
`;

const TableCellOnline = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.$online ? '#D6DCEC' : '#EF6284'};
`;

const StatusIndicator = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.$online ? '#B5EC5B' : '#EF6284'};
  margin-right: 16px;
`;

const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
`;

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  flex-shrink: 0;
  transition: all 0.2s;
	margin-right: 8px;
	@media (max-width: 480px) {
    margin-right: 4px !important;
		width: 40px;
  	height: 40px;
  }
`;
const ButtonDir = styled(BaseButton)`
  border: 2px solid #336CFF;
  

  &:hover {
    background-color: #336CFF;
  }
`;

const ButtonList = styled(BaseButton)`
  display: none;
	border: 2px solid #2F3953;

	@media (max-width: 768px) {
    display: flex;
  }
`;
const ButtonSetting = styled(BaseButton)`
  border: 2px solid #2F3953;
  margin-right: 24px;
  @media (max-width: 991px) {
    flex-direction: row;
    margin-right: 8px;
  }
`;

const ButtonDel = styled(BaseButton)`
  border: 2px solid #2F3953;

  &:hover {
    border: none;
    background-color: rgba(239, 98, 132, 0.08);
  }
`;
