import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
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
} = process.env;

const {
  DATABASE_DEV_URL,
  DATABASE_STAGE_URL,
  DATABASE_URL: DATABASE_PROD_URL,
} = process.env;

// imported isDev is not initialized
const isDev = NODE_ENV === 'development';
const useStageDB = false;

function getDataBaseUrl() {
  if (isDev) {
    return useStageDB ? DATABASE_STAGE_URL : DATABASE_DEV_URL;
  }
  return DATABASE_PROD_URL;
}

export const DATABASE_URL = getDataBaseUrl();

export const DB_SSL = isDev ? useStageDB : true;
