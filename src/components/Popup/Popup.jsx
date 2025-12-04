import { useEffect, useRef } from "react";
import styled from "styled-components";
import { usePopupStore } from "@/store/popupStore"
import PopupHead from "@/components/Popup/PopupHead";
import SettingsPopup from "@/components/Popup/SettingsPopup";
import ModePopup from "@/components/Popup/ModePopup";
import PublicationsPopup from "@/components/Popup/PublicationsPopup";
import MyTeamPopup from "@/components/Popup/MyTeamPopup";
import ImageGenerationPopup from "@/components/Popup/ImageGenerationPopup";
import IndustrialLibraryPopup from "@/components/Popup/IndustrialLibraryPopup";
import CreatePostСommonPopup from "@/components/Popup/CreatePostСommonPopup";
import CreatePostPopup from "@/components/Popup/CreatePostPopup";
import LinkGenerationPrevPopup from "@/components/Popup/LinkGenerationPrevPopup";
import LinkGenerationPopup from "@/components/Popup/LinkGenerationPopup";
import PromotionPopup from "@/components/Popup/PromotionPopup";
import FilteringPopup from "@/components/Popup/FilteringPopup";
import SourcesPopup from "@/components/Popup/SourcesPopup";
import CompilationPopup from "@/components/Popup/CompilationPopup";
import SchedulePopup from "@/components/Popup/SchedulePopup";
import ScheduleIntervalPopup from "@/components/Popup/ScheduleIntervalPopup";
import IndustrialStylePopup from "@/components/Popup/IndustrialStylePopup";
import CalendarPopup from "@/components/Popup/CalendarPopup";

const Popup = () => {
    const { popup } = usePopupStore()
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: "smooth"
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
            ) : popup.content == 'my_team' ? (
                <MyTeamPopup/>
            ) : popup.content == 'image_generation' ? (
                <ImageGenerationPopup/>
            ) : popup.content == 'industrial_library' ? (
                <IndustrialLibraryPopup/>
            ) : popup.content == 'create_post_common' ? (
                <CreatePostСommonPopup/>
            ) : popup.content == 'create_post' ? (
                <CreatePostPopup/>
            ) : popup.content == 'link_generation_prev' ? (
                <LinkGenerationPrevPopup/>
            ) : popup.content == 'link_generation' ? (
                <LinkGenerationPopup/>
            ) : popup.content == 'promotion' ? (
                <PromotionPopup/>
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
            ) : (
                2
            )}
        </PopupListContainer>
    )
}
const PopupListContainer = styled.section`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: absolute;
    top: 100px;
    left: 0;
    padding: 20px clamp(32px, calc((100vw - 1600px) * (73 - 32) / 400 + 32px), 73px) 30px;
    background-color: #1217268F;
    backdrop-filter: blur(20px);
    width: 100%;
    overflow-y: auto;
    scrollbar-width: none;
    max-height: calc(100svh - 100px);
    height: 100%;
    z-index: 10;
    @media(max-width: 1600px) {
        padding: 20px 32px 30px;   
    }
    @media(max-width: 480px) {
        padding: 20px 24px 30px;   
    }
`

export default Popup
