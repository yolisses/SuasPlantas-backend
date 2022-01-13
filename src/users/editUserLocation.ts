import { getManager } from 'typeorm';
import { findLocationByCoordinates } from '../location/findLocationByCoordinates';
import { getPoint } from '../location/getPoint';
import { ILocation } from '../location/Location';
import { Plant } from '../plants/Plant';
import { User, UserId } from './User';

interface EditUserLocationProps {
  userId: UserId;
  location: ILocation;
}
interface EditUserLocationResult {
  user: User;
  locationFound: boolean;
}

export async function editUserLocation({
  userId,
  location,
}: EditUserLocationProps): Promise<EditUserLocationResult> {
  const user = await User.findOne(userId);
  let locationFound = true;
  try {
    const { city, state } = await findLocationByCoordinates(location);
    user.city = city;
    user.state = state;
    user.location = getPoint(location);
    await user.save();
    await getManager().update(
      Plant,
      { userId: user.id },
      { city, state, location: getPoint(location) },
    );
  } catch (err) {
    console.log(err);
    locationFound = false;
  }
  return { user, locationFound };
}
