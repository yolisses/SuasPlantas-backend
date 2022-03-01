// eslint-disable-next-line no-unused-vars
import { UserId } from '../../users/User';

declare module 'express-session' {
  export interface SessionData {
    userId:UserId
  }
}
