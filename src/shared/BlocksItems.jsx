import styled from "styled-components";
import { useState } from "react";

import { usePopupStore } from "@/store/popupStore"

const BlocksItems = ({ items, color, view = true, onRemove }) => {
  const { popup } = usePopupStore();
  const [errorAvatars, setErrorAvatars] = useState([]);
  return (
    <ItemsContainer>
      {items?.map((item, index) => {
        const isError = errorAvatars.includes(item.id);

        return (
        <BlocksItem key={index}>
          <ItemValue>
            {item.icon && !isError &&
              <img
                src={item.icon} alt="item icon" 
                onError={() =>
                  setErrorAvatars((prev) => [
                    ...prev,
                    item.id,
                  ])
                }
              />}
            {item.value}
          </ItemValue>
          {view && (
            <RemoveBtn onClick={() =>
              onRemove(
                popup && (popup.content === 'filtering' || popup.content === 'compilation_upload')
                  ? item.value
                  : item.id
              )}
              $color={color}
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.625 16C2.14375 16 1.73192 15.8261 1.3895 15.4782C1.04708 15.1304 0.875583 14.7117 0.875 14.2222V2.66667H0V0.888889H4.375V0H9.625V0.888889H14V2.66667H13.125V14.2222C13.125 14.7111 12.9538 15.1298 12.6114 15.4782C12.269 15.8267 11.8568 16.0006 11.375 16H2.625ZM4.375 12.4444H6.125V4.44444H4.375V12.4444ZM7.875 12.4444H9.625V4.44444H7.875V12.4444Z" fill="#6A7080" />
              </svg>
            </RemoveBtn>
          )}
        </BlocksItem>
        )
      })}
    </ItemsContainer>
  )
}

const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 32px;
`
const BlocksItem = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-radius: 12px;
  border: 2px solid #333E59;
  padding: 16px 16px 18px 24px;
  /* max-width: 240px; */
  font-size: 14px;
  font-weight: 700;
`
const ItemValue = styled.span`
  display: flex;
  align-items: center;
  gap: 16px;

  img {
    width: 24px;
    height: 24px;
  }
`
const RemoveBtn = styled.button`
  padding: 0;

  svg {
        
    &:hover {
      path {
        fill: ${({ $color }) => $color}
      }
    }
  }     
`;

export default BlocksItems