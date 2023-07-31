import React from "react";

import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ListingForm from "./ListingForm";
import { useCreateListingMutation } from "../../../features/listings/listingsApi";

const Index = ({ mode }) => {
  const [createListing, { data, isError, error, isLoading }] =
    useCreateListingMutation();

  const handleCreateNewListing = async (listingData) => {
    const ListingForm = new FormData();
    console.log(listingData);

    const propertyMedia = listingData?.propertyMedia;
    listingData.propertyMedia = [];

    const planImages = listingData?.floorPlans?.map((floorPlan) => {
      const planImage = floorPlan.planImage[0];
      floorPlan.planImage = null;
      return planImage;
    });
    console.log(planImages, propertyMedia);

    propertyMedia.forEach((media) => {
      ListingForm.append("propertyMedia[]", media);
    });

    planImages.forEach((media) => {
      ListingForm.append("planImages[]", media);
    });

    ListingForm.append("listingData", JSON.stringify(listingData));

    await createListing(ListingForm);
  };

  if (data) console.log(data);

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
                  mode={mode}
                  onSubmit={handleCreateNewListing}
                  isError={isError}
                  error={error}
                  isLoading={isLoading}
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
