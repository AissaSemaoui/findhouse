import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Home7 from "../components/home-7";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Home-7" />
      <Home7 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
