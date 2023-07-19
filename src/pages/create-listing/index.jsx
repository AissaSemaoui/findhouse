import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import CreateListing from "../../components/dashboard/create-listing";
import { withAdminAccess } from "../../utils/withAdminAccess";

const index = () => {
  return (
    <>
      <Seo pageTitle="Create Listing" />
      <CreateListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
