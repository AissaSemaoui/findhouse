import dynamic from "next/dynamic";
import Seo from "../components/common/seo";
import HomeMain from "../components/home";
import { getAllListings } from "../backend/controllers/listings.controller";
import { connectToDatabase } from "../backend/utils/db";

export const getServerSideProps = async () => {
  try {
    await connectToDatabase();

    let { listings: listingsDoc } = await getAllListings({
      page: "all",
      isFeatured: true,
    });

    const listings = JSON.parse(JSON.stringify(listingsDoc));

    return {
      props: {
        featuredListings: listings,
      },
    };
  } catch (err) {
    console.log(err);
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
