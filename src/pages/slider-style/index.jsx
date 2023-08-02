import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import SliderStyle from "../../components/listing-style/slider-style";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Listing - Slider Style" />
      <SliderStyle />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
