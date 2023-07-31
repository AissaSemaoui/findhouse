import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import EditListing from "../../components/dashboard/edit-listing";
import { withAdminAccess } from "../../utils/withAdminAccess";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Edit Listing" />
      <EditListing mode="edit" />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
