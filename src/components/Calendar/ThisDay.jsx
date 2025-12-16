import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import CustomSelect from "@/shared/CustomSelect";
import { postsDatas } from "@/data/postsDatas";
import useFadeOnScroll from "@/lib/useFadeOnScroll";

const ThisDay = () => {
	const { fadeVisible, ref } = useFadeOnScroll(20);
  return (
    <DayWrapper>
      <DayHeader>
        <Date>15 ноября</Date>
        <DayNav>
          <DayNavButton><img src={arrow} alt="arrow icon" /></DayNavButton>
          <DayNavButton><img src={arrow} alt="arrow icon" /></DayNavButton>
        </DayNav>
      </DayHeader>

      <ChannelRow>
        <Label>Канал</Label>
        <CustomSelect/>
      </ChannelRow>

      <SectionTitle>Посты в этот день:</SectionTitle>

      <Grid $fadeVisible={fadeVisible} ref={ref}>
        {postsDatas.map((item, index) => (
          <Card key={index}>
            <CardHeader>
              <CardAuthor>
                <CardAva src={item.ava} alt="ava icon" width={24} height={24}/>
                <CardName>{item.username}</CardName>
              </CardAuthor>
              <CardEdit>Изменить</CardEdit>
            </CardHeader>
            <CardPreview src={item.img} width={48} height={48}/>
            <CardTitle>{item.title}</CardTitle>
            <CardSubtitle>{item.description}</CardSubtitle>
            <CardFooter>
              <CardTime>в 21:00</CardTime>
              <CardPublish>Опубликовать</CardPublish>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </DayWrapper>
  )
}
const DayWrapper = styled.div`

`;
const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Date = styled.h2`
  color: #336CFF;
  font-size: 24px;
  font-weight: 700;
`;
const DayNav = styled.div`
  display: flex;
  gap: 8px;
`;
const DayNavButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const ChannelRow = styled.div`
  margin-top: 32px;
`;
const Label = styled.div`
  font-size: 14px;
  margin-bottom: 24px;
  font-weight: 700;
`;
const SectionTitle = styled.h2`
  margin: 40px 0 24px;
  font-size: 14px;
  font-weight: 700;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px 8px;
	overflow-y: auto;
  scrollbar-width: none;
  max-height: calc(100dvh - 480px);
	padding-bottom: 30px;

	&::after {
    content: '';
    position: fixed;
    bottom: 0;
    height: 135px;
    width: 100%;
    background: linear-gradient(to top, #131826, transparent);
    backdrop-filter: blur(8px);
    mask-image: linear-gradient(to top, black 50%, transparent);
    transition: opacity 0.2s;
    opacity: ${({$fadeVisible}) => $fadeVisible ? 1 : 0};
    pointer-events: none;
		z-index: 1;
    @media(max-width: 1400px) {
        display: none;
    }
  }
`;
const Card = styled.div`
  background: #181F30;
  border-radius: 24px;
  padding: 24px;
`;
const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const CardAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const CardAva = styled.img`
  border-radius: 50%;
`;
const CardName = styled.p`
  font-size: 14px;
  font-weight: 700;
`;
const CardEdit = styled.p`
  color: #336CFF;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;
const CardPreview = styled.img`
  border-radius: 16px;
  margin-bottom: 16px;
`;
const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
	display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const CardSubtitle = styled.p`
	font-weight: 600;
  font-size: 14px;
  color: #6A7080;
  margin: 16px 0;
	display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const CardTime = styled.p`
	font-weight: 700;
  font-size: 14px;
  color: #336CFF;
`;
const CardPublish = styled.p`
  font-weight: 700;
  font-size: 14px;
  color: #336CFF;
	cursor: pointer;
`;
export default ThisDay
