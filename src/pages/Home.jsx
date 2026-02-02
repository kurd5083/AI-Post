import Statistics from "@/components/Home/Statistics";
import FeedMentions from "@/components/Home/FeedMentions";
import TableGroupsHead from "@/components/Home/TableGroupsHead";
import СhannelContainer from "@/components/Home/СhannelContainer";
import TableGroups from "@/components/Home/TableGroups";
import GridGroups from "@/components/Home/GridGroups";

import { useViewStore } from "@/store/viewStore";

const Home = () => {
  const viewType = useViewStore((state) => state.viewType);
  
  return (
    <>
      <Statistics />
      <FeedMentions />
      <TableGroupsHead />
      <СhannelContainer>
        {viewType === 'grid' ? <GridGroups /> : <TableGroups />}
      </СhannelContainer>
    </>
  );
}

export default Home;
