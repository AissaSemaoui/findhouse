import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import AgencyV2 from "../../components/agency-view/agency-v2";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Simple Listing – AgencyV2" />
      <AgencyV2 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
