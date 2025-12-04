import styled from "styled-components";
import ToggleSwitch from "@/shared/ToggleSwitch";
import Counter from "@/shared/Counter";
import BtnSave from "@/shared/BtnSave";

const PromotionPopup = () => {
    return (
        <PromotionContainer>
            <PromotionHead>
                <PromotionHeadText $active={true}>Просмотр</PromotionHeadText>
                <PromotionHeadText>Бусты</PromotionHeadText>
            </PromotionHead>
            <PromotionViews>
                <ToggleSwitch bg="#EF6283"/>
                <PostTitle>Просмотры на новый пост<br/> и автозакупка после публикации</PostTitle>
            </PromotionViews>
            <ViewsPost>
                <PostTitle>Просмотры на пост</PostTitle>
                <PostContainer>
                    <Counter placeholder="Мин."/>
                    <Counter placeholder="Макс."/>
                </PostContainer>
            </ViewsPost>
            <PromotePost>
                <PostTitle>Продвинуть пост</PostTitle>
                <PromoteText>Введите ссылку на пост и количество просмотров<br/>для ручного продвижения</PromoteText>
                <PostContainer>
                    <CounterContainer>
                        <CounterTitle>Ссылка на пост:</CounterTitle>
                        <PostInput placeholder="https://"/>
                    </CounterContainer>
                    <CounterContainer>
                        <CounterTitle>Количество просмотров</CounterTitle>
                        <Counter placeholder=""/>
                    </CounterContainer>
                </PostContainer>
            </PromotePost>
            <BtnSave  $margin="64">Сохранить</BtnSave>
        </PromotionContainer>

    )
}

const PromotionContainer = styled.div`

`
const PromotionHead = styled.div`
    display: flex;
    gap: 32px;
`
const PromotionHeadText = styled.p`
    display: flex;
    gap: 32px;
    color: ${({$active}) => $active ? '#D6DCEC' : '#6A7080'};
    padding-bottom: 32px;
    border-bottom: 2px solid ${({$active}) => $active ? '#D6DCEC' : '#2E3954'};
    font-weight: 700;
    font-size: 24px;
    padding-right: 40px;
    cursor: pointer;
    @media(max-width: 480px) {
        padding-right: 0;
    }
`
const PromotionViews = styled.div`
    display: flex;
    gap: 32px;
    margin-top: 40px;
`
const PostTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    @media(max-width: 480px) {
        font-size: 16px;
    }
`
const PostContainer = styled.div`
    display: flex;
    gap: 16px;
`
const ViewsPost = styled.div`
    margin-top: 64px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media(max-width: 480px) {
        margin-top: 48px;
    }
`
const PromotePost = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 64px;
    @media(max-width: 480px) {
        margin-top: 48px;
    }
`
const PromoteText = styled.p`
    line-height: 24px;
    font-size: 14px;
    font-weight: 600;
    color: #6A7080;
`
const CounterContainer  = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const CounterTitle  = styled.p`
    font-weight: 700;
    font-size: 14px;
`
const PostInput  = styled.input`
    border: 2px solid #333E59;
    border-radius: 12px;
    width: 100%;
    padding: 16px 24px;
    max-width: 280px;
    color: #D6DCEC;
    font-size: 14px;
    font-weight: 700;
    background-color: transparent;
    @media(max-width: 480px) {
        font-size: 16px;
    }
    &::placeholder {
        color: #D6DCEC;
    }
`

export default PromotionPopup
