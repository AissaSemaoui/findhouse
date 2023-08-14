import React, { useEffect, useState } from "react";

import selectedFiles from "../../../utils/selectedFiles";
import { isObjectFile } from "../../../utils/file";
import { deleteFileFromDB } from "../../../features/listings";

const PropertyMediaUploader = ({
  register,
  setValue,
  errors,
  watch,
  listingId,
}) => {
  const propertyMedia = watch("propertyMedia") || [];

  const attachments = watch("attachments");

  const attachmentUrl =
    typeof attachments?.[0]?.filePath === "string"
      ? attachments?.[0]?.filePath
      : isObjectFile(attachments?.[0])
      ? URL.createObjectURL(attachments[0])
      : "";

  const setAttachments = (value) => {
    setValue("attachments", value);
  };

  const setPropertyMedia = (value) => {
    setValue("propertyMedia", value);
  };

  // multiple image select
  const multipleImage = (e) => {
    // checking is same file matched with old stored array
    const isExist = propertyMedia?.some((file1) => {
      return selectedFiles(e)?.some((file2) => file1.name === file2.name);
    });

    if (!isExist) {
      const newPropertyMedia = [...propertyMedia, ...selectedFiles(e)];
      setPropertyMedia(newPropertyMedia);
    } else {
      alert("You have selected one image already!");
    }
  };

  // delete image
  const deleteImage = async (image, index) => {
    const isUploaded = typeof image?.filePath === "string";
    const isFile = isObjectFile(image);
    let deleted = propertyMedia;
    if (isFile) {
      deleted = propertyMedia?.filter((_, i) => i !== index);
    } else if (isUploaded) {
      await deleteFileFromDB(listingId, "propertyMedia", image);
      deleted = propertyMedia?.filter((_, i) => i !== index);
    } else {
      deleted = propertyMedia?.filter((file) => file !== image);
    }
    setPropertyMedia(deleted);
  };

  // delete attachment
  const deleteAttachment = async (attachment) => {
    const isUploaded = typeof attachment?.filePath === "string";
    const isFile = isObjectFile(attachment);
    let deleted = propertyMedia;
    if (isFile) {
      deleted = [];
    } else if (isUploaded) {
      await deleteFileFromDB(listingId, "attachments", attachment);
      deleted = [];
    } else {
      deleted = [];
    }
    setAttachments(deleted);
  };

  return (
    <div className="row">
      <div className="col-lg-12">
        <ul className="mb-0">
          {propertyMedia.length > 0
            ? propertyMedia?.map((item, index) => (
                <li key={index} className="list-inline-item">
                  <div className="portfolio_item is-invalid mb-2">
                    <img
                      className="img-fluid cover"
                      src={
                        isObjectFile(item)
                          ? URL.createObjectURL(item)
                          : item?.filePath
                      }
                      alt="fp1.jpg"
                    />
                    <a onClick={() => deleteImage(item, index)}>
                      <div
                        className="edu_stats_list "
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                        data-original-title="Delete"
                      >
                        <span className="flaticon-garbage"></span>
                      </div>
                    </a>
                  </div>
                  {errors && (
                    <div className="invalid-feedback mb-2">
                      {errors?.[index]?.message}
                    </div>
                  )}
                </li>
              ))
            : undefined}

          {/* End li */}
        </ul>
      </div>
      {/* End .col */}

      <div className="col-lg-12">
        <div className="portfolio_upload">
          <input
            type="file"
            onChange={multipleImage}
            className="is-invalid"
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
          <div className="icon">
            <span className="flaticon-download"></span>
          </div>
          <p>Drag and drop images here</p>
          {errors?.message && (
            <div className="invalid-feedback">
              At least one image is required
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-6">
        <div className="resume_uploader mb30">
          <h3>Attachments</h3>
          {attachments?.length > 0 ? (
            <div className="d-flex mb-3 position-relative">
              <a onClick={() => deleteAttachment(attachments?.[0])}>
                <div
                  className="edu_stats_list "
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Delete"
                  data-original-title="Delete"
                >
                  <span className="flaticon-garbage"></span>
                </div>
              </a>
              <div className="icon_box_area style2">
                <div className="score">
                  <span className="flaticon-document text-thm fz30"></span>
                </div>
                <div className="details">
                  <h5>
                    <a
                      href={attachmentUrl}
                      download
                      className="flaticon-download text-thm pr10"
                    ></a>
                    {attachments?.[0]?.name || attachments?.[0]?.fileName}
                  </h5>
                </div>
              </div>
            </div>
          ) : (
            <div className="form-inline d-flex flex-wrap wrap">
              <label className="upload">
                <input type="file" {...register("attachments")} />
                Select Attachment
              </label>
            </div>
          )}
        </div>
      </div>
      {/* End .col */}

      {/* <div className="col-xl-12">
        <div className="my_profile_setting_input">
          <button className="btn btn1 float-start">Back</button>
          <button className="btn btn2 float-end">Next</button>
        </div>
      </div> */}
      {/* End .col */}
    </div>
  );
};

export default PropertyMediaUploader;
