import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Service from "../components/service";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Service" />
      <Service />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
