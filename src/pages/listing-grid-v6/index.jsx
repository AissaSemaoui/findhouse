import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV6 from "../../components/listing-grid/grid-v6";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Simple Listing – Grid V6" />
      <GridV6 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
