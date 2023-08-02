import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MySavedSearch from "../../components/dashboard/my-saved-search";
import { withAdminAccess } from "../../utils/withAdminAccess";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Saved Search" />
      <MySavedSearch />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
