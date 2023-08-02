import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ListV1 from "../../components/listing-list/list-v1";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Simple Listing – List V1" />
      <ListV1 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
