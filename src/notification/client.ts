import { Client } from 'onesignal-node';
import { ONESIGNAL_REST_API_KEY, ONESIGNAL_REST_APP_ID } from '../config/env';

export const client = new Client(ONESIGNAL_REST_APP_ID, ONESIGNAL_REST_API_KEY);
