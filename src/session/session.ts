import { isTest } from '../config/env';
import { DBSessionManager } from './DBSessionManager';
import { MemorySessionManager } from './MemorySessionManager';

let sessionValue;

export function session() {
  if (!sessionValue) {
    sessionValue = isTest
      ? new MemorySessionManager({ timeToExpire: 10000 })
      : new DBSessionManager({ timeToExpire: 1000 });
  }
  return sessionValue;
}
