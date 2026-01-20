import styled from "styled-components";
import BtnBase from "@/shared/BtnBase";

import PageHead from '@/components/PageHead'
import CalendarBlock from '@/components/Calendar/CalendarBlock';
import ThisDay from "@/components/Calendar/ThisDay";

import AiGeneratorIcon from '@/icons/AiGeneratorIcon';

import { useCalendarEventsByRange } from "@/lib/calendar/useCalendarEventsByRange";

import { usePopupStore } from "@/store/popupStore"
import { useCalendarStore } from "@/store/calendarStore";

const Calendar = () => {
  const { openPopup, changeContent } = usePopupStore()
  const { selectedDate, setSelectedDate } = useCalendarStore();

  const { events: posts, eventsPending } = useCalendarEventsByRange(
    selectedDate.startISO,
    selectedDate.endISO
  );
  return (
    <CalendarContainer>
      <PageHead>
        <BtnBase
          $padding="16px 32px"
          $bg="#336CFF"
          $color="#FFFFFF"
          onClick={(e) => {
            e.stopPropagation();

            openPopup("select_channel", "popup_window", {
              onSave: (selectedChannelId) => {
                const closeCurrent = () => {
                  const { popup, goBack, closePopup } = usePopupStore.getState();
                  popup?.previousPage?.length > 0 ? goBack() : closePopup();
                };

                closeCurrent();

                setTimeout(() => {
                  openPopup("add_post", "popup", {
                    selectedDate: new Date(),
                    channelId: selectedChannelId, 
                  });
                }, 0);
              },
              loading: false,
            });
          }}
        >
          + Создать новый пост
        </BtnBase>
      </PageHead>
      <CalendarContent>
        <CalendarGrid>
          <CalendarBlock posts={posts} eventsPending={eventsPending} />
        </CalendarGrid>
        <CalendarStatistic >
          <StatisticTitle><AiGeneratorIcon color="#336CFF" />Статистика</StatisticTitle>
          <StatisticList>
            <div>
              <ItemHead>
                <ItemIcon $bg="#285257" $color="#66FFE8"></ItemIcon>
                <h3>14 постов</h3>
              </ItemHead>
              <ItemTime>На этой неделе</ItemTime>
            </div>
            <div>
              <ItemHead>
                <ItemIcon $bg="#4E4233" $color="#FFBD5A"></ItemIcon>
                <h3>8 постов</h3>
              </ItemHead>
              <ItemTime>На следующей неделе</ItemTime>
            </div>
            <div>
              <ItemHead>
                <ItemIcon $bg="#4E243C" $color="#FF4A7D"></ItemIcon>
                <h3>40 постов</h3>
              </ItemHead>
              <ItemTime>Создается</ItemTime>
            </div>
          </StatisticList>
        </CalendarStatistic>
        <CalendarThisDay>
          <ThisDay posts={posts} eventsPending={eventsPending} />
        </CalendarThisDay>
      </CalendarContent>
    </CalendarContainer>
  )
}

const CalendarContainer = styled.section`
`;
const CalendarContent = styled.div`
  display: grid;
  gap: 64px;
  grid-template-columns: 410px 410px 1fr 1fr 1fr;
  grid-template-rows: min-content;
  align-items: start;
  
  @media(max-width: 1600px) {
    gap: 40px;
    grid-template-columns: 380px 380px 1fr 1fr 1fr;
  }
  @media(max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
const CalendarGrid = styled.div`
  box-sizing: border-box;
  width: 880px;
  align-self: start;
  grid-column:  1 / span 2;
  grid-row: 1;
  
  
  @media(max-width: 1600px) {
    width: 800px;
  }
  @media(max-width: 1400px) {
    grid-column:  1 / span 5;
    width: 100%;
  }
`;
const CalendarStatistic = styled.div`
  box-sizing: border-box;
  grid-column:  1 / span 2;
  grid-row: 2;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
  padding-left: 56px;

  @media(max-width: 1600px) {
    padding-left: 32px;
  }
  @media(max-width: 1400px) {
    grid-column:  1 / span 5;
    grid-row: 3;
    padding: 0 32px 30px;
  }
  @media(max-width: 768px) {
    padding: 0 24px 30px;
  }
`;
const StatisticTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 24px;
  font-weight: 800;
`;
const StatisticList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px 72px;
  margin-top: 40px;
`;
const ItemHead = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;
const ItemIcon = styled.span`
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${({ $bg }) => $bg};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: ${({ $color }) => $color};
  }
`;
const ItemTime = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #6A7080;
`;
const CalendarThisDay = styled.div`
  box-sizing: border-box;
  grid-column: 3 / span 3;
  grid-row: 1/ span 2;
  width: 100%;
  padding-right: 56px;

  @media(max-width: 1600px) {
    padding-right: 32px;
  }
  @media(max-width: 1400px) {
    grid-column:  1 / span 5;
    grid-row: 2;
    padding: 0 32px;
  }
  @media(max-width: 768px) {
    padding: 0 24px;
  }
`;

export default Calendar
