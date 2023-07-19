import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyFavourites from "../../components/dashboard/my-favourites";
import { withAdminAccess } from "../../utils/withAdminAccess";

const index = () => {
  return (
    <>
      <Seo pageTitle="My Favourites" />
      <MyFavourites />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(index)), {
  loading: () => <h1>Loading component...</h1>,
  ssr: false,
});
