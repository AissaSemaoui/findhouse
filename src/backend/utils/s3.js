import S3 from "aws-sdk/clients/s3";

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_V1;
const secretAccessKey = process.env.AWS_SECRET_KEY_V1;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// upload file to s3 function

const uploadFile = (file) => {
  try {
    const uploadParams = {
      Bucket: bucketName,
      Body: file.buffer,
      Key: `${Date.now()}-${file.originalname}`,
      ACL: "public-read",
    };

    return s3.upload(uploadParams).promise();
  } catch (err) {
    console.log("Error uploading image : ", err);
  }
};

const uploadFiles = async (files) => {
  try {
    const uploadPromises = files.map((file) => {
      return uploadFile(file);
    });

    const results = await Promise.allSettled(uploadPromises);

    const formattedResult = [];
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        formattedResult.push({
          fileName: result.value.key,
          filePath: result.value.Location,
        });
      }
    });

    return formattedResult;
  } catch (err) {
    console.log("Error uploading files : ", err);
    return [];
  }
};

// Delete Image
const deleteImage = async (filePath) => {
  try {
    const deleteParams = {
      Bucket: bucketName,
      Key: filePath,
    };

    return await s3.deleteObject(deleteParams).promise();
  } catch (err) {
    console.error("Error deleting image : ", err);
  }
};

export { uploadFile, uploadFiles, deleteImage };
