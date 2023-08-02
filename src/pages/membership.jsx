import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import Membership from "../components/membership";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Membership" />
      <Membership />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
