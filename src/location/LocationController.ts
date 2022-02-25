import { getReqIp } from '../users/getReqIp';
import { getLocationByIp } from './getLocationByIp';

export const LocationController = {
  async get(req, res) {
    const ip = await getReqIp(req);
    const location = await getLocationByIp(ip);
    await res.send(location);
  },
};
