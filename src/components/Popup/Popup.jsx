import { useEffect, useRef } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import PopupHead from "@/components/Popup/PopupHead";
import SettingsPopup from "@/components/Popup/SettingsPopup";
import ModePopup from "@/components/Popup/ModePopup";
import PublicationsPopup from "@/components/Popup/PublicationsPopup";
import MyTeamAddPopup from "@/components/Popup/MyTeamAddPopup";
import MyTeamPopup from "@/components/Popup/MyTeamPopup";
import ImageGenerationPopup from "@/components/Popup/ImageGenerationPopup";
import IndustrialLibraryPopup from "@/components/Popup/IndustrialLibraryPopup";
import LinkGenerationPrevPopup from "@/components/Popup/LinkGenerationPrevPopup";
import LinkGenerationPopup from "@/components/Popup/LinkGenerationPopup";
import LinkGenerationMyPopup from "@/components/Popup/LinkGenerationMyPopup";
import PromotionPopup from "@/components/Popup/PromotionPopup";
import BoostsPopup from "@/components/Popup/BoostsPopup";
import FilteringPopup from "@/components/Popup/FilteringPopup";
import SourcesPopup from "@/components/Popup/SourcesPopup";
import CompilationPopup from "@/components/Popup/CompilationPopup";
import SchedulePopup from "@/components/Popup/SchedulePopup";
import ScheduleIntervalPopup from "@/components/Popup/ScheduleIntervalPopup";
import IndustrialStylePopup from "@/components/Popup/IndustrialStylePopup";
import CalendarPopup from "@/components/Popup/CalendarPopup";
import NotificationsPopup from "@/components/Popup/NotificationsPopup";
import ReplenishPopup from "@/components/Popup/ReplenishPopup";
import ProfilePopup from "@/components/Popup/ProfilePopup";
import UploadMediaPopup from "@/components/Popup/UploadMediaPopup";
import CompilationUploadPopup from "@/components/Popup/CompilationUploadPopup";
import AdvancedPopup from "@/components/Popup/AdvancedPopup";
import AiGeneratorPopup from "@/components/Popup/AiGeneratorPopup";

const Popup = () => {
    const { popup } = usePopupStore()
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: "auto"
            });
        }
    }, [popup.content]);
    return (
        <PopupListContainer ref={containerRef}>
            <PopupHead />
            {popup.content == 'settings' ? (
                <SettingsPopup/>
            ) : popup.content == 'mode' ? (
                <ModePopup/>
            ) : popup.content == 'publications' ? (
                <PublicationsPopup/>
            ) : popup.content == 'my_team_add' ? (
                <MyTeamAddPopup/>
            ) : popup.content == 'my_team' ? (
                <MyTeamPopup/>
            ) : popup.content == 'image_generation' ? (
                <ImageGenerationPopup/>
            ) : popup.content == 'industrial_library' ? (
                <IndustrialLibraryPopup/>
            ) : popup.content == 'link_generation_prev' ? (
                <LinkGenerationPrevPopup/>
            ) : popup.content == 'link_generation' ? (
                <LinkGenerationPopup/>
            ) : popup.content == 'my_link_generation' ? (
                <LinkGenerationMyPopup/>
            ) : popup.content == 'promotion' ? (
                <PromotionPopup/>
            ) : popup.content == 'boosts' ? (
                <BoostsPopup/>
            ) : popup.content == 'filtering' ? (
                <FilteringPopup/>
            ) : popup.content == 'sources' ? (
                <SourcesPopup/>
            ) : popup.content == 'compilation' ? (
                <CompilationPopup/>
            ) : popup.content == 'schedule' ? (
                <SchedulePopup/>
            ) : popup.content == 'schedule_interval' ? (
                <ScheduleIntervalPopup/>
            ) : popup.content == 'post_style' ? (
                <IndustrialStylePopup/>
            ) : popup.content == 'calendar' ? (
                <CalendarPopup/>
            ) : popup.content == 'notifications' ? (
                <NotificationsPopup/>
            ) : popup.content == 'replenish' ? (
                <ReplenishPopup/>
            ) : popup.content == 'profile' ? (
                <ProfilePopup/>
            ) : popup.content == 'upload_media' ? (
                <UploadMediaPopup/>
            ) : popup.content == 'compilation_upload' ? (
                <CompilationUploadPopup/>
            ) : popup.content == 'advanced' ? (
                <AdvancedPopup/>
            ) : popup.content == 'create_post' ? (
                <AiGeneratorPopup/>
            ) : popup.content == 'premoderation' ? (
                <PremoderationPopup/>
            ) : (
                null
            )}
        </PopupListContainer>
    )
}
const PopupListContainer = styled.section`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    padding: 120px 0 30px;
    background-color: #121726ad;
    backdrop-filter: blur(30px);
    width: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    max-height: 100dvh;
    height: 100%;
    z-index: 10;
`

export default Popup
