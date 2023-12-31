import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Home8 from "../components/home-8/Home8";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Home-8" />
      <Home8 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
