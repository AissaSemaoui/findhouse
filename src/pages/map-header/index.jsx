import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MapHeader from "../../components/listing-style/map-header";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Listing - Map Header" />
      <MapHeader />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
