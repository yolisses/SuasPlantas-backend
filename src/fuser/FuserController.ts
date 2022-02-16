import { getReqIp } from '../users/getReqIp';
import { getFusers } from './getFusers';
import { removeFuser } from './removeFuser';

export const FuserController = {
  async get(req, res) {
    const { page, ...rest } = req.query;
    const fusers = await getFusers({
      page: Number(page) || 0,
      ...rest,
    });
    res.send(fusers);
  },

  async remove(req, res) {
    const { id } = req.params;
    const ip = getReqIp(req);
    const fuser = await removeFuser(id, ip);
    res.send(fuser);
  },
};
