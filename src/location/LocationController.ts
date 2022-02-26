import { Request, Response } from 'express';
import { getReqIp } from '../users/getReqIp';
import { findLocationByCoordinates } from './findLocationByCoordinates';
import { getLocationByIp } from './getLocationByIp';

export const LocationController = {
  async get(req:Request, res:Response) {
    const ip = await getReqIp(req);
    const location = await getLocationByIp(ip);
    await res.send(location);
  },

  async getName(req, res) {
    const { latitude, longitude } = req.query;
    const result = await findLocationByCoordinates({ latitude, longitude });
    await res.send(result);
  },
};
