import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyReview from "../../components/dashboard/my-review";
import { withAdminAccess } from "../../utils/withAdminAccess";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Review" />
      <MyReview />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
