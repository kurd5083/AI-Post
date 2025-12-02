import Statistics from "@/components/Home/Statistics"
import FeedMentions from "@/components/Home/FeedMentions"
import TableGroupsHead from "@/components/Home/TableGroupsHead"
import TableGroupsTable from "@/components/Home/TableGroupsTable"
import Popup from "@/components/Popup"
import { usePopupStore } from "@/store/popupStore"

const Home = () => {
  const { popup } = usePopupStore();
  return (
    <>
      <Statistics/>
      <FeedMentions/>
      <TableGroupsHead/>
      <TableGroupsTable/>
      {popup && <Popup content={popup.content}/>}
    </>
  )
}

export default Home
