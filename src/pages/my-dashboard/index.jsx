import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyDashboard from "../../components/dashboard/my-dashboard";
import { withAdminAccess } from "../../utils/withAdminAccess";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Dashboard" />
      <MyDashboard />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
