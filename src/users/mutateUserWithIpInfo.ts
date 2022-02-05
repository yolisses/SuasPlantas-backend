/* eslint-disable no-param-reassign */
import { getLocationByIp } from '../location/getLocationByIp';
import { getPoint } from '../location/getPoint';
import { isValidIp } from './isValidIp';
import { User } from './User';

export async function mutateUserWithIpInfo(user:User, ip:string) {
  if (isValidIp(ip)) {
    user.ip = ip;

    if (!user.location || !user.city || !user.city) {
      const {
        city,
        state,
        latitude,
        longitude,
      } = await getLocationByIp(ip);

      if (!user.city) user.city = city;
      if (!user.state) user.state = state;
      if (!user.location) user.location = getPoint({ latitude, longitude });
    }
  }
}
