import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import EditListing from "../../components/dashboard/edit-listing";
import { withAdminAccess } from "../../utils/withAdminAccess";
import Loader from "../../components/common/Loader";

const Index = () => {
  return (
    <>
      <Seo pageTitle="Edit Listing" />
      <EditListing />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <Loader />,
  ssr: false,
});
