import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import CreateFolderPopup from "@/components/PopupWindow/CreateFolderPopup";
import MoveChannelPopup from "@/components/PopupWindow/MoveChannelPopup";
import ChangeTimePopup from "@/components/PopupWindow/ChangeTimePopup";
import DeleteConfirmPopup from "@/components/PopupWindow/DeleteConfirmPopup";
import SelectChannelsPopup from "@/components/PopupWindow/SelectChannelsPopup";
import CreateCalendarEventPopup from "@/components/PopupWindow/CreateCalendarEventPopup";

const PopupWindow = () => {
    const { popup, goBack, closePopup } = usePopupStore();

    
    return (
        <PopupContainer onClick={popup && popup?.previousPage.length > 0 ? goBack() : closePopup()}>
            <PopupContent onClick={(e) => e.stopPropagation()}>
                {popup.content == 'create_folder' ? (
                    <CreateFolderPopup />
                ) : popup.content == 'move_channel' ? (
                    <MoveChannelPopup />
                ) : popup.content == 'delete_confirm' ?(
                    <DeleteConfirmPopup />
                ) : popup.content == 'select_channel' ?(
                    <SelectChannelsPopup />
                ) : popup.content == 'create_calendar_event' ?(
                    <CreateCalendarEventPopup />
                ) : (
                    2
                )}
            </PopupContent>
        </PopupContainer>
    )
}

const PopupContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    left: 0;
    padding: 120px 56px 30px;
    background-color: #121726ad;
    backdrop-filter: blur(30px);
    width: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    max-height: 100dvh;
    height: 100%;
    z-index: 10;
    @media(max-width: 1600px) {
        padding: 120px 32px 30px;   
    }
    @media(max-width: 480px) {
        padding: 120px 24px 30px;   
    }
`
const PopupContent = styled.div`
    margin-top: 50px;
    box-sizing: border-box;
    max-width: 520px;
    width: 100%;
    background: #1c243860;
    border-radius: 32px;
    padding: 48px;
    @media(max-width: 480px) {
        margin-top: 30px;
        padding: 32px 24px;   
    }
`
export default PopupWindow
