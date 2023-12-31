import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyPackage from "../../components/dashboard/my-package";
import { withAdminAccess } from "../../utils/withAdminAccess";
import Loader from "../../components/common/Loader";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Package" />
      <MyPackage />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <Loader />,
  ssr: false,
});
