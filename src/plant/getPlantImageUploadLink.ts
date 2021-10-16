import { UserId } from "user/User";
import * as uuid from "uuid-random";
import { s3 } from "vendor/s3";

export async function createPlantImageUpdateLink(userId: UserId) {
  const key = `uploads/${uuid()}.webp`;
  const bucketName = process.env.AWS_BUCKET_NAME;
  const oneHour = 60 * 60;

  const params = {
    Key: key,
    Expires: oneHour,
    Bucket: bucketName,
    ContentType: "image/webp",
    Metadata: { userId: "" + userId },
  };

  return s3.getSignedUrlPromise("putObject", params);
}
