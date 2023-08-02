import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import BlogV3 from "../components/blog-list-3";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Blog Gid 3" />
      <BlogV3 />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
