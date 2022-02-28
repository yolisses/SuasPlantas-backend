import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from './env';

function getAwsConfig() {
  return {
    region: AWS_REGION,
    signatureVersion: 'v4',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  };
}

export const awsConfig = getAwsConfig();
