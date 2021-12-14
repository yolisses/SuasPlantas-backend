// eslint-disable-next-line no-unused-vars
import { User, UserId } from '../../users/User';

declare module 'express-session' {
  export interface SessionData {
    user: User;
    userId:UserId
  }
}
