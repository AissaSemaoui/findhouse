import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyProfile from "../../components/dashboard/my-profile";
import { withAdminAccess } from "../../utils/withAdminAccess";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Profile" />
      <MyProfile />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
