import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ListingMapV3 from "../../components/listing-half-map/listing-map-v3";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Listing - Map V3" />
      <ListingMapV3 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
