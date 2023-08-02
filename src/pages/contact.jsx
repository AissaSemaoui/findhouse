import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Contact from "../components/contact";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Contact" />
      <Contact />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
