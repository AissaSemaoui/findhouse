import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import ParallaxStyle from "../../components/listing-style/parallax-style";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Listing - Parallax Style" />
      <ParallaxStyle />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
