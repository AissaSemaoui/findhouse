import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyReview from "../../components/dashboard/my-review";
import { withAdminAccess } from "../../utils/withAdminAccess";
import Loader from "../../components/common/Loader";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Review" />
      <MyReview />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <Loader />,
  ssr: false,
});
