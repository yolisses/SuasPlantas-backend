import { Request, Response } from 'express';
import { getReqUA } from '../request/getReqUA';
import { isBrowser } from '../request/isBroswer';
import { getReqIp } from '../users/getReqIp';
import { error } from '../utils/error';
import { createVisualization } from './createVisualization';

export const VisualizationController = {
  async addNew(req:Request, res:Response) {
    const ua = getReqUA(req);
    if (!isBrowser(ua)) {
      error(502, 'Invalid User Agent visualization');
    }

    const { fbId } = req.body;
    const ip = getReqIp(req);
    const visualization = await createVisualization({ ip, fbId });
    res.send(visualization);
  },
};
