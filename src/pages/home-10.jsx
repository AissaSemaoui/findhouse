import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Home10 from "../components/home-10";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Home-10" />
      <Home10 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
