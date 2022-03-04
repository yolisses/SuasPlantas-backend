import { MemorySessionManager } from './MemorySessionManager';

export const session = new MemorySessionManager({ timeToExpire: 1000 });
