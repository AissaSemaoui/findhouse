import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import { getAllListings } from "../features/listings";

export const getServerSideProps = async () => {
  const { listings } = await getAllListings("page=all&isFeatured=true");
  return {
    props: {
      featuredListings: listings,
    },
  };
};

const Index = ({ featuredListings }) => {
  return (
    <>
      <Seo pageTitle="Acasa" />
      <HomeMain featuredListings={featuredListings} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
