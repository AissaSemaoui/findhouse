import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Home6 from "../components/home-6";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Home-6" />
      <Home6 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
