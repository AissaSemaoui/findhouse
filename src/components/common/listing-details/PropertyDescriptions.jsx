import { useState } from "react";

import { splitParagraphByKeywords } from "../../../utils/stringUtils";

const PropertyDescriptions = ({ description }) => {
  const [click, setClick] = useState(true);
  const handleClick = () => setClick(!click);

  const [smallDescription, longDescription] = splitParagraphByKeywords(
    description,
    60
  );

  return (
    <>
      <p className="">{smallDescription}</p>
      {longDescription && (
        <>
          <p className={click ? "gpara second_para white_goverlay " : ""}></p>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <p className="">{longDescription}</p>
            </div>
          </div>
          <p className="overlay_close">
            <a
              className="text-thm fz14"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="false"
              aria-controls="collapseExample"
              onClick={handleClick}
            >
              Show More <span className="flaticon-download-1 fz12"></span>
            </a>
          </p>
        </>
      )}
    </>
  );
};

export default PropertyDescriptions;
