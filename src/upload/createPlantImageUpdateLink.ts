import { s3 } from 'vendor/s3.js';

const bucketName = process.env.AWS_BUCKET_NAME;

export async function createPlantImageUpdateLink(imageName) {
  const params = ({
    Key: `uploads/${imageName}`,
    Expires: 60 * 60, // one hour
    Bucket: bucketName,
  });

  return s3.getSignedUrlPromise('putObject', params);
}
