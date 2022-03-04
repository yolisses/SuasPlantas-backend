export interface Session{
  token:string
  userId:number
  createdAt:Date
}

type SessionGroup = {[key:string]:Session}

const sessions:SessionGroup = {};

export class MemorySessionManager {
  timeToExpire: number;

  constructor({ timeToExpire }) {
    this.timeToExpire = timeToExpire;
  }

  async getUserId(token:string) {
    return sessions[token].userId;
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

  getExpiration(date:Date, timeToExpire:number) {
    const expiration = new Date(date);
    expiration.setSeconds(expiration.getSeconds() + timeToExpire);
    return expiration;
  }

  deleteExpiredSessions() {
    Object.values(sessions).forEach((session) => {
      const now = new Date();
      const expiration = this.getExpiration(session.createdAt, this.timeToExpire);
      if (now > expiration) {
        delete sessions[session.token];
      }
    });
  }
}
