import { s3 } from '../vendor/s3';
import { UserId } from '../users/User';
import { AWS_BUCKET_NAME } from '../config/env';
import { oneHourInMinutes } from '../utils/oneHourInMinutes';

export async function getNewUploadLink(key :string, userId: UserId) {
  const params = {
    Key: `uploads/${key}`,
    Expires: oneHourInMinutes,
    Bucket: AWS_BUCKET_NAME,
    Metadata: { userId: `${userId}` },
  };
  return s3.getSignedUrlPromise('putObject', params);
}
