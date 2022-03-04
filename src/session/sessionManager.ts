import { MemorySessionManager } from './MemorySessionManager';

export const sessionManager = new MemorySessionManager({ timeToExpire: 1000 });
