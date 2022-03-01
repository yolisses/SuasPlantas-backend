import { getConnection } from 'typeorm';
import { MemoryStore } from 'express-session';
import { TypeormStore } from 'connect-typeorm/out';

import { isTest } from '../config/env';
import { Session } from '../signIn/Session';

function getSessionRepository() {
  const connection = getConnection();
  return connection.getRepository(Session);
}

// to be shared between test
const memoryStore = new MemoryStore();

export function getSessionStore() {
  const sessionStore = isTest
    ? memoryStore
    : new TypeormStore().connect(getSessionRepository());
  return sessionStore;
}
