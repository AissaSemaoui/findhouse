import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Home3 from "../components/home-3/Home3";

const Index = () => {
  return (
    <div className="maxw1600 mx-auto home-3-wrapper">
      <Seo pageTitle="Home-3" />
      <Home3 />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
