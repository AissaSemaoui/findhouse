import React from "react";

import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ListingForm from "../create-listing/ListingForm";
import {
  useGetSingleListingQuery,
  useUpdateListingMutation,
} from "../../../features/listings/listingsApi";
import { useRouter } from "next/router";
import { isObjectFile } from "../../../utils/file";

const Index = ({ mode }) => {
  const router = useRouter();
  const listingId = router.query?.listingId;

  const {
    data: listing,
    isError,
    error,
    isLoading,
  } = useGetSingleListingQuery(listingId);

  const [updateListing, { data, isUpdateError, updateError, isUpdateLoading }] =
    useUpdateListingMutation();

  const handleUpdateListing = async (listingData) => {
    const ListingForm = new FormData();

    const unUploadedPropertyMedia = [];
    listingData.propertyMedia = listingData?.propertyMedia?.filter((media) => {
      if (isObjectFile(media)) {
        unUploadedPropertyMedia.push(media);
        return false;
      }
      return true;
    });

    unUploadedPropertyMedia.forEach((media) => {
      ListingForm.append("propertyMedia[]", media);
    });

    const planImages = listingData?.floorPlans?.forEach((floorPlan) => {
      if (isObjectFile(floorPlan?.planImage?.[0])) {
        const planImage = floorPlan.planImage[0];
        ListingForm.append("planImages[]", planImage);
        floorPlan.planImage = { name: floorPlan.planImage[0].name };
      }
    });

    ListingForm.append("listingData", JSON.stringify(listingData));

    await updateListing({ listingId, ListingForm });
  };

  if (data) console.log("here is the listing dod : ", data);

  if (isLoading) return <h1>Its looading...</h1>;

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}
                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Add New Property</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div>
                {/* End .col */}

                <ListingForm
                  defaultValues={listing?.data}
                  onSubmit={handleUpdateListing}
                  mode={mode}
                  isError={isError}
                  error={error}
                  isLoading={isUpdateLoading}
                  listingId={listingId}
                />
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© 2020 Find House. Made with love.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
