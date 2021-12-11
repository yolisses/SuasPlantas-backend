import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from 'env/env';

function getAwsConfig() {
  const region = AWS_REGION;
  const accessKeyId = AWS_ACCESS_KEY_ID;
  const secretAccessKey = AWS_SECRET_ACCESS_KEY;

  return {
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
  };
}

export const awsConfig = getAwsConfig();
