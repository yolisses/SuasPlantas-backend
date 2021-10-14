import { Point } from 'geojson';
import { error } from 'utils/error';
import { User } from './User';

export async function getUser(id: number) {
  // const user = await User.findOne(id);
  // if (!user) error(404, 'User not found');

  const example: Point = {
    type: 'Point',
    coordinates: [0, 2]
  }
  let users
  // try {
  users = await User
    .createQueryBuilder('user')
    .where("user.location <> st_makePoint(:latitude, :longitude)", { latitude: 1, longitude: 3 })
    .getOne()
  // } catch (err) {
  // users = await User
  //   .createQueryBuilder('user')
  //   .where("user.location = st_makePoint(:latitude, :longitude)", { latitude: 1, longitude: 3 })
  //   .getSql()
  // }
  console.error(users)
  return users;
}
