import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV5 from "../../components/listing-grid/grid-v5";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Simple Listing – Grid V5" />
      <GridV5 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
