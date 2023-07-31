import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Acasa" />
      <HomeMain />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
