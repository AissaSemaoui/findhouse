import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Terms from "../components/terms-conditions";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Terms & Conditions" />
      <Terms />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
