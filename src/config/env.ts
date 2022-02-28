import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  BASE_URL,
  NODE_ENV,
  AUTH_SECRET,

  LOCATIONIQ_API_KEY,
  IP_GEOLOCATION_API_KEY,

  AWS_REGION,
  AWS_BUCKET_NAME,
  AWS_BUCKET_PATH,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  CREATE_CARD_LAMBDA_FUNCTION,

  ONESIGNAL_REST_APP_ID,
  ONESIGNAL_REST_API_KEY,

  GOOGLE_CLOUD_API_KEY,
} = process.env;

const {
  DATABASE_DEV_URL,
  DATABASE_TEST_URL,
  DATABASE_STAGE_URL,
  DATABASE_URL: DATABASE_PROD_URL,
} = process.env;

// imported isDev is not initialized
export const isTest = NODE_ENV === 'test';
export const isDev = NODE_ENV === 'development';
const useStageDB = false;

function getDataBaseUrl() {
  if (isTest) {
    return DATABASE_TEST_URL;
  }
  if (isDev) {
    return useStageDB ? DATABASE_STAGE_URL : DATABASE_DEV_URL;
  }
  return DATABASE_PROD_URL;
}

export const DATABASE_URL = getDataBaseUrl();

export const DB_SSL = (isDev || isTest) ? useStageDB : true;
