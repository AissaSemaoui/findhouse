import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Compare from "../components/compare";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Compare" />
      <Compare />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
