import { isTest } from '../config/env';
import { SessionManager } from './SessionManager';
import { DBSessionManager } from './DBSessionManager';
import { MemorySessionManager } from './MemorySessionManager';

let sessionValue:SessionManager;

export function session() {
  if (!sessionValue) {
    sessionValue = isTest
      ? new MemorySessionManager({ timeToExpire: 10000 })
      : new DBSessionManager({
        timeToExpire: 60 * 60 * 24 * 7 * 2, // two weeks
      });
  }
  return sessionValue;
}
