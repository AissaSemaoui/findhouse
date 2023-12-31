import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Faq from "../components/faq";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Faq" />
      <Faq />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
