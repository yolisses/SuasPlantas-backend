const bucketPath = process.env.AWS_BUCKET_PATH;

export function getRemoteUri(key: string) {
  return bucketPath + key;
}
