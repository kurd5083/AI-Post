import Statistics from "@/components/Home/Statistics"
import FeedMentions from "@/components/Home/FeedMentions"
import TableGroupsHead from "@/components/Home/TableGroupsHead"
import TableGroupsTable from "@/components/Home/TableGroupsTable"

const Home = () => {
  return (
    <>
      <Statistics/>
      <FeedMentions/>
      <TableGroupsHead/>
      <TableGroupsTable/>
    </>
  )
}

export default Home
