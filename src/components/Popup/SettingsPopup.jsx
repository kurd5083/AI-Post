import styled from "styled-components";
import arrow from "@/assets/arrow.svg";
import { settings } from "@/data/settings";
import ToggleSwitch from "@/shared/ToggleSwitch";
import { usePopupStore } from "@/store/popupStore"

const SettingsPopup = () => {
    const { changeContent } = usePopupStore()
    return (
        <PopupContent>
            {settings.sections.map((section) => (
                <PopupNav key={section.key}>
                    <PopupContentTitle>{section.label}</PopupContentTitle>
                    <PopupContentList>
                        {section.items.map((item, index) => (
                            <PopupContentItem key={index} onClick={item.right !== 'switch' ? () => changeContent(item.key) : undefined}>
                                <PopupContentLeft>
                                    <img src={item.extra.image} alt={item.name} style={{ background: item.extra.background }} width={40} height={40} />
                                    <PopupContentInfo $place={item.place} $size={item.size}>
                                        <h3>{item.name}</h3>
                                        {item.status && <span>{item.status}</span>}
                                    </PopupContentInfo>
                                </PopupContentLeft>
                                {item.right == 'arrow' ? (
                                    <img src={arrow} alt="arrow icon" height={12} width={6} />
                                ) : item.right == 'switch' ? (
                                    <ToggleSwitch bg="#FF9C55"/>
                                ) : item.right == 'textarrow' ? (
                                    <PopupContentRight>
                                        <span>Премодерация</span>
                                        <img src={arrow} alt="arrow icon" height={12} width={6} />
                                    </PopupContentRight>
                                ) : (
                                    <PopupContentCounter>{item.status}</PopupContentCounter>
                                )}
                            </PopupContentItem>
                        ))}
                    </PopupContentList>
                </PopupNav>
            ))}
        </PopupContent>
    )
}
const PopupContent = styled.div`
`
const PopupNav = styled.nav`
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 33px;
    &:first-child {
        margin-top: 0;
    }
`
const PopupContentTitle = styled.h2`
    color: #6A7080;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
`
const PopupContentList = styled.ul`

`
const PopupContentItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 0;
    border-bottom: 2px solid #2E3954;
    cursor: pointer;
    
    &:first-child {
        padding-top: 0;
    }
    &:last-child {
        padding-bottom: 0;
        border-bottom: 0;
    }
`
const PopupContentLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 24px ;
    img {
        box-sizing: border-box;
        border-radius: 8px;
        padding: 8px;
    }
  
`
const PopupContentInfo = styled.div`
    display: flex;
    flex-direction: ${props => props.$place ? 'row' : 'column'};
    align-items: ${props => props.$place ? 'center' : 'flex-start'};
    gap: ${props => props.$place ? '16px' : '8px'};
    
    h3 {
        font-weight: 700;   
        font-size: ${props => props.$size ? '24px' : '16px'};
    }

    span {
        color: #6A7080;
        font-size: ${props => props.$place ? '24px' : '12px'};
        font-weight: 700;
        text-transform: uppercase;
    }
`
const PopupContentRight = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`
const PopupContentCounter = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border: 2px solid #1F273B;
    border-radius: 12px;
    font-weight: 700;
    font-size: 14px;
`


export default SettingsPopup
