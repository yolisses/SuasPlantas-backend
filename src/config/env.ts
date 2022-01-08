import dotenv from 'dotenv';
import { isDev } from '../utils/isDev';

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
} = process.env;

const {
  DATABASE_DEV_URL,
  DATABASE_STAGE_URL,
  DATABASE_URL: DATABASE_PROD_URL,
} = process.env;

const useStageDB = true;

export const DATABASE_URL = DATABASE_PROD_URL || useStageDB ? DATABASE_STAGE_URL : DATABASE_DEV_URL;

export const DB_SSL = useStageDB;
