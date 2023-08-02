import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Home5 from "../components/home-5";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Home-5" />
      <Home5 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
