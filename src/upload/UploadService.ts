import uuid from 'uuid-random';
import { s3 } from '../vendor/s3';
import { UserId } from '../users/User';
import { AWS_BUCKET_NAME } from '../config/env';
import { oneHourInMinutes } from '../utils/oneHourInMinutes';

export async function generateUploadLink(userId: UserId) {
  const params = {
    Key: `uploads/${uuid()}`,
    Expires: oneHourInMinutes,
    Bucket: AWS_BUCKET_NAME,
    Metadata: { userId: `${userId}` },
  };
  return s3.getSignedUrlPromise('putObject', params);
}
