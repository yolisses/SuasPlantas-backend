import { SessionManager } from './SessionManager';

export interface Session{
  token:string
  userId:number
  createdAt:Date
}

type SessionGroup = {[key:string]:Session}

const sessions:SessionGroup = {};

export class MemorySessionManager implements SessionManager {
  timeToExpire: number;

  constructor({ timeToExpire }) {
    this.timeToExpire = timeToExpire;
  }

  async getUserId(token:string) {
    return sessions[token]?.userId;
  }

  getNewToken() {
    return `${Math.random()}`;
  }

  async create(userId:number) {
    const token = this.getNewToken();
    const createdAt = new Date();
    sessions[token] = { token, userId, createdAt };
    return token;
  }

  async delete(token:string) {
    delete sessions[token];
  }
}
