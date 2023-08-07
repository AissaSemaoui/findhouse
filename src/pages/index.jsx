import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import { getAllListings } from "../features/listings";

export const getServerSideProps = async () => {
  try {
    const { listings } = await getAllListings("page=all&isFeatured=true");
    console.log(process.env);
    return {
      props: {
        featuredListings: listings,
      },
    };
  } catch (error) {
    console.log("Error is here in the getServerSideProps : ", error);
    return {
      props: {
        featuredListings: [],
      },
    };
  }
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
