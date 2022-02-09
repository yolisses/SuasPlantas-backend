import { Request } from 'express';

export function getReqUA(req:Request) {
  return req.get('User-Agent') || req.headers['user-agent'];
}
