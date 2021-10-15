import { error } from "utils/error";
import { getLocationByCoordinates } from "location/getLocationByCoordinates";
import { User, UserId } from "./User";
import { getPoint } from "location/getPoint";
import { ILocation } from "location/ILocation";

interface EditUserLocationProps {
  userId: UserId;
  location: ILocation;
}

export async function editUserLocation({
  userId,
  location,
}: EditUserLocationProps) {
  const user = await User.findOne(userId);
  if (!user) error(404, "User not found");
  user.location = getPoint(location);
  try {
    const { city, state } = await getLocationByCoordinates(location);
    user.city = city;
    user.state = state;
    user.save();
    return user;
  } catch (err) {
    error(400, "" + err);
  }
}
