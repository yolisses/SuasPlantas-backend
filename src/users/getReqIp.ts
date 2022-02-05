import { Request } from 'express';

export function getReqIp(req:Request) {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  if (Array.isArray(ip)) [ip] = ip;
  return ip;
}
