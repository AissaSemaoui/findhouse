import Link from "next/link";
import Slider from "react-slick";
import properties from "../../data/properties";
import PropertyItem from "../common/listing-details/PropertyItem";

const FeaturedProperties = ({ featuredListings = [] }) => {
  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1200,
    infinite: false,

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...settings} arrows={true}>
        {featuredListings.slice(0, 15).map((listing) => (
          <div className="item" key={listing._id}>
            <div className="properti_city home6">
              <div className="thumb">
                <img
                  className="img-whp"
                  src={listing?.propertyMedia?.[0]?.filePath}
                  alt="fp1.jpg"
                />

                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {listing.isFeatured && (
                      <li className="list-inline-item">
                        <a href="#">Featured</a>
                      </li>
                    )}
                    <li className="list-inline-item" key={2}>
                      <a href="#">{listing?.status}</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* End .thumb */}

              <div className="overlay">
                <div className="details">
                  <Link href={`/listing-details-v1/${listing._id}`}>
                    <a className="fp_price">
                      ${listing.price}
                      <small>/mo</small>
                    </a>
                  </Link>
                  <h4>
                    <Link href={`/listing-details-v1/${listing._id}`}>
                      <a>{listing.propertyTitle}</a>
                    </Link>
                  </h4>
                  <ul className="prop_details mb0">
                    {/* {listing.itemDetails.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">
                          {val.name}: {val.number}
                        </a>
                      </li>
                    ))} */}
                    <PropertyItem listing={listing} />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default FeaturedProperties;
