import Link from "next/link";
import { useSelector } from "react-redux";
import properties from "../../../data/properties";
import { getAddressString } from "../../../utils/address";

const FeaturedItem = ({ allListings, isError, isLoading }) => {
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  if (isLoading) return <h1>loading...</h1>;

  if (isError) return <h1>Ops we got an error!</h1>;

  // properties
  // ?.slice(10, 16)
  // ?.filter(keywordHandler)
  // ?.filter(locationHandler)
  // ?.filter(statusHandler)
  // ?.filter(propertiesHandler)
  // ?.filter(priceHandler)
  // ?.filter(bathroomHandler)
  // ?.filter(bedroomHandler)
  // ?.filter(garagesHandler)
  // ?.filter(builtYearsHandler)
  // ?.filter(areaHandler)
  // ?.filter(advanceHandler)
  // ?.sort(statusTypeHandler)
  // ?.filter(featuredHandler)

  // add length of filter items
  // useEffect(() => {
  //   console.log(content);
  //   dispatch(addLength(content.length));
  // }, [dispatch, addLength, content]);

  if (allListings.length === 0) return <h1>Unfortently, nothing found!</h1>;

  return allListings.map((listing) => (
    <div
      className={`${
        isGridOrList ? "col-12 feature-list" : "col-md-6 col-lg-6"
      } `}
      key={listing.__id}
    >
      <div
        className={`feat_property home7 style4 ${
          isGridOrList && "d-flex align-items-center"
        }`}
      >
        <div className="thumb">
          <img
            className="img-whp"
            src={listing.propertyMedia[0]?.filePath}
            alt="fp1.jpg"
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              {!listing?.isFeatured && (
                <li className="list-inline-item">
                  <a href="#">Featured</a>
                </li>
              )}
              <li className="list-inline-item">
                <a href="#">{listing?.status}</a>
              </li>
            </ul>
            <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-transfer-1"></span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul>

            <Link href={`/listing-details-v1/${listing._id}`}>
              <a className="fp_price">
                ${listing.price}
                <small>/mo</small>
              </a>
            </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{listing.propertyType}</p>
            <h4>
              <Link href={`/listing-details-v1/${listing._id}`}>
                <a>{listing.propertyTitle}</a>
              </Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {getAddressString(listing.location)}
            </p>

            <ul className="prop_details mb0">
              {listing?.itemDetails?.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">
                    {val.name}: {val.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              <li className="list-inline-item">
                <Link href="/agent-v1">
                  <a>
                    <img src={listing?.poster?.image} alt="pposter1.png" />
                  </a>
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/agent-v1">
                  <a>{listing?.poster?.name}</a>
                </Link>
              </li>
            </ul>
            <div className="fp_pdate float-end">
              {listing.detailedInfo.yearBuilt}
            </div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));
};

export default FeaturedItem;
