const bucketPath = process.env.AWS_BUCKET_PATH;

export function getUriByKey(key: string) {
  return bucketPath + key;
}
