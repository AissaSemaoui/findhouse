import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyMessage from "../../components/dashboard/my-message";
import { withAdminAccess } from "../../utils/withAdminAccess";
import Loader from "../../components/common/Loader";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Message" />
      <MyMessage />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <Loader />,
  ssr: false,
});
