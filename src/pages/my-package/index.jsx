import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPackage from "../../components/dashboard/my-package";
import { withAdminAccess } from "../../utils/withAdminAccess";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Package" />
      <MyPackage />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
