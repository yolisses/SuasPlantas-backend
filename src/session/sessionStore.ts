import { getConnection } from 'typeorm';
import { TypeormStore } from 'connect-typeorm/out';
import { isTest } from '../config/env';
import { Session } from '../signIn/Session';

function getSessionRepository() {
  const connection = getConnection();
  return connection.getRepository(Session);
}

export function getSessionStore() {
  const sessionStore = isTest
    ? undefined
    : new TypeormStore().connect(getSessionRepository());
  return sessionStore;
}
