  import { useEffect, useState } from "react";
  import styled from "styled-components";
  import { advancedDatas } from "@/data/advancedDatas";
  import Checkbox from "@/shared/Checkbox";
  import { usePopupStore } from "@/store/popupStore"
  import { useChannelById } from "@/lib/channels/useChannelById";
  import { useUpdateChannelField } from "@/lib/channels/useUpdateChannelField";
  import BtnBase from "@/shared/BtnBase";

  const AdvancedPopup = () => {
    const { popup } = usePopupStore();
    const channelId = popup?.data?.channelId;
    const { channel } = useChannelById(channelId);

    const [localSwitches, setLocalSwitches] = useState({
      forced_posting: channel?.forcePosting || false,
      disable_media: channel?.disableMedia || false,
      transferring_source_text: channel?.preserveOriginalText || false,
      add_source_post: channel?.includeSourceLink || false, 
    });

    useEffect(() => {
      if (!channel) return;

      setLocalSwitches({
        forced_posting: channel.forcePosting || false,
        disable_media: channel.disableMedia || false,
        transferring_source_text: channel.preserveOriginalText || false,
        add_source_post: channel.includeSourceLink || false,
      });
    }, [channel]);

    const { mutate: toggleField, isPending: fieldPending } = useUpdateChannelField();

    const checkboxConfig = {
      forced_posting: {
        checked: localSwitches.forced_posting,
        onChange: () => {
          setLocalSwitches(prev => ({ ...prev, forced_posting: !prev.forced_posting }));
        },
      },
      disable_media: {
        checked: localSwitches.disable_media,
        onChange: () => {
          setLocalSwitches(prev => ({ ...prev, disable_media: !prev.disable_media }));
        },
      },
      transferring_source_text: {
        checked: localSwitches.transferring_source_text,
        onChange: () => {
          setLocalSwitches(prev => ({ ...prev, transferring_source_text: !prev.transferring_source_text }));
        },
      },
      add_source_post: {
        checked: localSwitches.add_source_post,
        onChange: () => {
          setLocalSwitches(prev => ({ ...prev, add_source_post: !prev.add_source_post }));
        },
      },
    };
    const handleSave = () => {
      if (!channel) return;

      const fieldsToUpdate = [];

      if (localSwitches.forced_posting !== channel.forcePosting) fieldsToUpdate.push("forcePosting");
      if (localSwitches.disable_media !== channel.disableMedia) fieldsToUpdate.push("disableMedia");
      if (localSwitches.transferring_source_text !== channel.preserveOriginalText) fieldsToUpdate.push("preserveOriginalText");
      if (localSwitches.add_source_post !== channel.includeSourceLink) fieldsToUpdate.push("includeSourceLink");

      if (!fieldsToUpdate.length) return;

      fieldsToUpdate.forEach((field) => toggleField({ channelId, field }));
    };
    return (
      <AdvancedContainer>
        {advancedDatas.map((item, index) => (
          <AdvancedItem key={index}>
            <AdvancedIcon $bg={item.extra.background}>
              {item.extra.image ? (
                <img src={item.extra.image} alt={`advanced icon`} />
              ) : (
                <>
                  {item.extra.icon}
                </>
              )}
            </AdvancedIcon>
            <ItemText>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </ItemText>
            <Checkbox
              color="#FFF980"
              checked={checkboxConfig[item.key]?.checked || false}
              onChange={checkboxConfig[item.key]?.onChange}
            />
          </AdvancedItem>
        ))}
        <BtnBase
          $margin="64"
          onClick={handleSave}
          disabled={fieldPending}
        >
          {fieldPending ? "Сохраняем..." : "Сохранить"}
        </BtnBase>
      </AdvancedContainer>
    )
  }
  const AdvancedContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 56px;

    @media(max-width: 1600px) {
      padding: 0 32px;
    }
    @media(max-width: 768px) {
      padding: 0 24px;
    }
  `
  const AdvancedItem = styled.div`
    display: flex;
    gap: 24px;
    padding: 24px 0;
    border-bottom: 2px solid #2E3954;

    &:first-child {
      padding-top: 0;
    }
      
    &:last-of-type {
      padding-bottom: 0;
      border-bottom: 0;
    }
  `
  const ItemText = styled.div`
    flex-grow: 1;

    h4 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 16px;
      @media(max-width: 480px) {
        font-size: 16px;
        padding-left: 64px;
        height: 40px;
        margin-bottom: 24px;
      }
    }
      
    p {
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
      color: #6A7080;
      max-width: 560px;
      @media(max-width: 480px) {
        max-width: calc(100% + 64px);
        width: calc(100% + 64px);
      }
    }
  `
  const AdvancedIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    margin-top: 6px;
    background-color: ${({ $bg }) => $bg};

    @media(max-width: 480px) {
      position: absolute;
      margin-top: 0;
    }

  `
  export default AdvancedPopup
