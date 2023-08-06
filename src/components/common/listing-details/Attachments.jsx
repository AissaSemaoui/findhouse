const Attachments = ({ attachments }) => {
  return attachments.map((attachment) => (
    <div className="icon_box_area style2">
      <div className="score">
        <span className="flaticon-document text-thm fz30"></span>
      </div>
      <div className="details">
        <h5>
          <a
            href={attachment.filePath}
            download
            className="flaticon-download text-thm pr10"
          ></a>
          Demo Word
          {attachment.fileName}
        </h5>
      </div>
    </div>
  ));
};

export default Attachments;
