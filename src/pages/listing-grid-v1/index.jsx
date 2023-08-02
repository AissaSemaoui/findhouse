import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV1 from "../../components/listing-grid/grid-v1";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Simple Listing – Grid V1" />
      <GridV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
