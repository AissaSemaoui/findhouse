import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import AgentV1 from "../../components/agent-view/agent-v1";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Simple Listing – Agent V1" />
      <AgentV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
