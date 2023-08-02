import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyMessage from "../../components/dashboard/my-message";
import { withAdminAccess } from "../../utils/withAdminAccess";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Message" />
      <MyMessage />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
