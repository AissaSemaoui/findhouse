import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Gallery from "../components/gallery";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Gallery" />
      <Gallery />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
