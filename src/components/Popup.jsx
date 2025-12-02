import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"

import PopupHead from "@/components/PopupHead";
import SettingsPopup from "@/components/SettingsPopup";
import ModePopup from "@/components/ModePopup";
import PublicationsPopup from "@/components/PublicationsPopup";
import MyTeamPopup from "@/components/MyTeamPopup";
import ImageGenerationPopup from "@/components/ImageGenerationPopup";
import IndustrialLibraryPopup from "@/components/IndustrialLibraryPopup";
import CreatePostPopup from "@/components/CreatePostPopup";
import LinkGenerationPopup from "@/components/LinkGenerationPopup";

const Popup = () => {
    const { popup } = usePopupStore()
    return (
        <PopupListContainer>
            <PopupHead />
            {popup.content == 'settings' ? (
                <SettingsPopup/>
            ) : popup.content == 'mode' ? (
                <ModePopup/>
            ) : popup.content == 'publications' ? (
                <PublicationsPopup/>
            ) : popup.content == 'my_team' ? (
                <MyTeamPopup/>
            ) : popup.content == 'image_generation' ? (
                <ImageGenerationPopup/>
            ) : popup.content == 'industrial_library' ? (
                <IndustrialLibraryPopup/>
            ) : popup.content == 'create_post' ? (
                <CreatePostPopup/>
            ) : popup.content == 'link_generation' ? (
                <LinkGenerationPopup/>
            ) : (
                2
            )}
            
        </PopupListContainer>
    )
}
const PopupListContainer = styled.section`
    box-sizing: border-box;
    position: absolute;
    top: 100px;
    left: 0;
    padding: 20px 73px 0;   
    background-color: #1217268F;
    backdrop-filter: blur(16px);
    width: 100%;
    height: calc(100% - 100px);
    z-index: 1;
`

export default Popup
