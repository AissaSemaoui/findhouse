import { useEffect, useState } from "react";
import Link from "next/link";

import properties from "../../../data/properties";
import { getAddressString } from "../../../utils/address";
import { deleteListing } from "../../../features/listings";

const TableData = ({ allListings, error, isLoading }) => {
  const [listings, setListings] = useState(allListings || []);

  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "View",
    "Action",
  ];

  useEffect(() => {
    setListings(allListings);
  }, [allListings]);

  const handleDelete = async (listingId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this listing?"
    );
    if (!isConfirmed) return;

    await deleteListing(listingId);
    const newListings = listings.filter((listing) => listing._id !== listingId);
    setListings([...newListings]);
  };

  if (error) return <h1>Ops we got an error! {error}</h1>;

  if (isLoading) return <h1>Loading...</h1>;

  let tbodyContent = listings?.map((listing) => (
    <tr key={listing._id}>
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="thumb">
            <img
              className="img-whp cover"
              src={listing?.propertyMedia[0]?.filePath}
              alt="fp1.jpg"
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">{listing?.status}</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <h4>{listing?.propertyTitle}</h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {getAddressString(listing?.location)}
              </p>
              <a className="fp_price text-thm" href="#">
                ${listing?.price}
                <small>/mo</small>
              </a>
            </div>
          </div>
        </div>
      </td>
      {/* End td */}

      <td>{new Date(listing?.createdAt).toDateString()}</td>
      {/* End td */}

      <td>
        <span className="status_tag badge">{listing?.status}</span>
      </td>
      {/* End td */}

      <td>2,345</td>
      {/* End td */}

      <td>
        <ul className="view_edit_delete_list mb0">
          <Link href={`/edit-listing/${listing._id}`}>
            <li
              className="list-inline-item"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
            >
              <a>
                <span className="flaticon-edit"></span>
              </a>
            </li>
          </Link>
          {/* End li */}

          <li
            className="list-inline-item"
            data-toggle="tooltip"
            data-placement="top"
            title="Delete"
            onClick={() => handleDelete(listing._id)}
          >
            <a>
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
      {/* End td */}
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        {/* End theaad */}

        <tbody>{tbodyContent}</tbody>
      </table>
    </>
  );
};

export default TableData;
