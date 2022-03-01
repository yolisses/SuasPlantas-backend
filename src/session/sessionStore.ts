import { TypeormStore } from 'connect-typeorm/out';
import { isTest } from '../config/env';
import { Session } from '../signIn/Session';

export const sessionStore = isTest
  ? undefined
  : new TypeormStore().connect(Session.getRepository());
