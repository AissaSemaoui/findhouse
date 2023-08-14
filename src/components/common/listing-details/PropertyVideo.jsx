import { useState } from "react";
import ModalVideo from "react-modal-video";
import { extractYouTubeVideoId } from "../../../utils/helpers";

const PropertyVideo = ({ detailedInfo }) => {
  const [isOpen, setOpen] = useState({ status: false, videoId: "" });

  const isYoutubeVideo = isOpen?.videoId.includes("youtube");
  const videoId = isYoutubeVideo
    ? extractYouTubeVideoId(isOpen?.videoId)
    : isOpen?.videoId;

  return (
    <>
      <ModalVideo
        channel={isYoutubeVideo ? "youtube" : "custom"}
        autoplay
        isOpen={isOpen.status}
        videoId={videoId}
        onClose={() => setOpen({ status: false, videoId: "" })}
      />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {detailedInfo?.videoURL && (
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#description"
              role="tab"
            >
              Property video
            </a>
          </li>
        )}
        {detailedInfo?.virtualTour360 && (
          <li className="nav-item">
            <a
              className="nav-link"
              data-bs-toggle="tab"
              href="#listing"
              role="tab"
            >
              Virtual Tour
            </a>
          </li>
        )}
      </ul>
      {/* End .nav-tabs */}

      <div className="tab-content" id="myTabContent2">
        {detailedInfo?.videoURL && (
          <div
            className="tab-pane fade show active"
            id="description"
            role="tabpanel"
          >
            <div className="property_video">
              <div className="thumb">
                <img
                  className="pro_img img-fluid w100"
                  src="/assets/images/background/7.jpg"
                  alt="7.jpg"
                />
                <div className="overlay_icon">
                  <div
                    onClick={() =>
                      setOpen({ status: true, videoId: detailedInfo?.videoURL })
                    }
                    role="button"
                    className="video_popup_btn red popup-youtube"
                  >
                    <span className="flaticon-play"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {detailedInfo?.virtualTour360 && (
          <div
            className="tab-pane fade row pl15 pl0-1199 pr15 pr0-1199"
            id="listing"
            role="tabpanel"
          >
            <div className="property_video">
              <div className="thumb">
                <img
                  className="pro_img img-fluid w100"
                  src="/assets/images/background/7.jpg"
                  alt="7.jpg"
                />
                <div className="overlay_icon">
                  <div
                    onClick={() =>
                      setOpen({
                        status: true,
                        videoId: detailedInfo?.virtualTour360,
                      })
                    }
                    role="button"
                    className="video_popup_btn red popup-youtube"
                  >
                    <span className="flaticon-play"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* End .tab-conten */}
    </>
  );
};

export default PropertyVideo;
