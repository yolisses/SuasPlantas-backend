import { AWS_BUCKET_NAME } from '../config/env';
import { UserId } from '../users/User';
import { s3 } from '../vendor/s3';

export async function getPlantImageUpdateLink(key: string, userId: UserId) {
  const bucketName = AWS_BUCKET_NAME;
  const oneHour = 60 * 60;

  const params = {
    Key: key,
    Expires: oneHour,
    Bucket: bucketName,
    ContentType: 'image/webp',
    Metadata: { userId: `${userId}` },
  };

  return s3.getSignedUrlPromise('putObject', params);
}
