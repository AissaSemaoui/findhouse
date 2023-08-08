import dynamic from "next/dynamic";
import Seo from "../../components/common/seo";
import GridV3 from "../../components/listing-grid/grid-v3";

import { connectToDatabase } from "../../backend/utils/db";
import { getAllListings } from "../../backend/controllers/listings.controller";

export const getServerSideProps = async (ctx) => {
  try {
    await connectToDatabase();

    let {
      listings: listingsDoc,
      currentPage,
      totalPages,
      numberOfResults,
    } = await getAllListings(ctx?.query);

    const listings = JSON.parse(JSON.stringify(listingsDoc));

    return {
      props: {
        data: { listings, currentPage, totalPages, numberOfResults },
      },
    };
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
};

const Index = ({ data, error }) => {
  return (
    <>
      <Seo pageTitle="Simple Listing – Grid V3" />
      <GridV3 data={data} error={error} />
    </>
  );
};

export default dynamic(() => Promise.resolve(Index), { ssr: false });
