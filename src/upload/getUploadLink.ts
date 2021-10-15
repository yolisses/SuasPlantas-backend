import { s3 } from "vendor/s3";

export async function getUploadLink(name) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const params = {
    Key: `uploads/${name}`,
    Expires: 60 * 60, // one hour
    Bucket: bucketName,
    Metadata: {
      user: "some-value",
    },
  };

  return s3.getSignedUrlPromise("putObject", params);
}
