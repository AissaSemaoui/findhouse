import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProperties from "../../components/dashboard/my-properties";
import { withAdminAccess } from "../../utils/withAdminAccess";
import Loader from "../../components/common/Loader";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Properties" />
      <MyProperties />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <Loader />,
  ssr: false,
});
