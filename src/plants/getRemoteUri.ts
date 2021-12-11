import { AWS_BUCKET_PATH } from '../env/env';

export function getRemoteUri(key: string) {
  return AWS_BUCKET_PATH + key;
}
