import { LessThan } from 'typeorm';
import { Session } from './SessionEntity';
import { SessionManager } from './SessionManager';

export class DBSessionManager implements SessionManager {
  timeToExpire: number;

  constructor({ timeToExpire }:{timeToExpire:number}) {
    this.timeToExpire = timeToExpire;
    this.deleteExpiredSessions();
  }

  async getUserId(token:string) {
    try {
      const sesssion = await Session.findOne(token);
      return sesssion.userId;
    } catch (err) {
      console.error(err);
    }
    return undefined;
  }

  async create(userId:number) {
    const session = await Session.create({ userId }).save();
    return session.token;
  }

  async delete(token:string) {
    const session = await Session.findOne(token);
    await session.remove();
  }

  deleteExpiredSessions() {
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() - this.timeToExpire);
    Session.getRepository().delete({ createdAt: LessThan(expiration) });
  }
}
