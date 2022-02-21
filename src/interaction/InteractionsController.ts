import { getReqUA } from '../request/getReqUA';
import { getReqIp } from '../users/getReqIp';
import { createInteraction } from './createInteraction';

export const InteractionsController = {
  async create(req, res) {
    const data = req.body;
    const ip = getReqIp(req);
    const ua = getReqUA(req);
    const interation = await createInteraction(data, ip, ua);
    res.send(interation);
  },
};
