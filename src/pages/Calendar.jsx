import PageHead from '@/components/PageHead'
import BtnBase from "@/shared/BtnBase";
import { usePopupStore } from "@/store/popupStore"

const Calendar = () => {
  const { openPopup } = usePopupStore()
  return (
    <>
      <PageHead>
        <BtnBase 
          $padding="16px 32px" 
          $bg="#336CFF"
          $color="#FFFFFF"
          onClick={() => openPopup("create_post_common")}
        >
          + Создать новый пост
        </BtnBase>
      </PageHead>
    </>
  )
}

export default Calendar
