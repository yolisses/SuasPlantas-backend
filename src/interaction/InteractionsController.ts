import { getReqIp } from '../users/getReqIp';
import { createInteraction } from './createInteraction';

export const InteractionsController = {
  async create(req, res) {
    const data = req.body;
    const ip = getReqIp(req);
    const interation = await createInteraction(data, ip);
    res.send(interation);
  },
};
