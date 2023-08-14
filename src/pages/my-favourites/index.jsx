import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import MyFavourites from "../../components/dashboard/my-favourites";
import { withAdminAccess } from "../../utils/withAdminAccess";
import Loader from "../../components/common/Loader";

const Index = () => {
  return (
    <>
      <Seo pageTitle="My Favourites" />
      <MyFavourites />
    </>
  );
};

export default dynamic(() => Promise.resolve(withAdminAccess(Index)), {
  loading: () => <Loader />,
  ssr: false,
});
