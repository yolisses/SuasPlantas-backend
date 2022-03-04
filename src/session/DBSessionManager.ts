import { LessThan } from 'typeorm';
import { Session } from './SessionEntity';

export class DBSessionManager {
  timeToExpire: number;

  constructor({ timeToExpire }) {
    this.timeToExpire = timeToExpire;
    this.deleteExpiredSessions();
  }

  async getUserId(token:string) {
    const sesssion = await Session.findOne(token);
    return sesssion.userId;
  }

  async create(userId:number) {
    const session = await Session.create({ userId }).save();
    return session.token;
  }

  async delete(token:string) {
    const session = await Session.findOne(token);
    return session.remove();
  }

  deleteExpiredSessions() {
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() - this.timeToExpire);
    Session.getRepository().delete({ createdAt: LessThan(expiration) });
  }
}
