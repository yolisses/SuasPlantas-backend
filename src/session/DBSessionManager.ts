import { LessThan } from 'typeorm';
import { Session } from './Session';

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

  deleteExpiredSessions() {
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() - this.timeToExpire);
    Session.getRepository().delete({ createdAt: LessThan(expiration) });
  }
}
