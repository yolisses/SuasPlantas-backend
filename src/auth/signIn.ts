import { createUser } from "user/createUser";
import { getUserByEmail } from "user/getUserByEmail";
import { User } from "user/User";
import { error } from "utils/error";
import { verifyGoogleToken } from "./verifyGoogleToken";
import { TokenPayload } from "google-auth-library";
import { getLocationByIp } from "location/getLocationByIp";
import { getPoint } from "location/getPoint";

export async function signIn(googleToken: string, ip: string) {
  let payload: TokenPayload;
  try {
    payload = await verifyGoogleToken(googleToken);
  } catch (err) {
    error(400, err.message);
  }
  const { email, name, picture } = payload;
  let user: User = await getUserByEmail(email);

  if (!user) {
    const locationData = await getLocationByIp(ip);
    const { latitude, longitude, state, city } = locationData;
    const location = getPoint({ latitude, longitude });
    user = await createUser({
      name,
      city,
      email,
      state,
      location,
      image: picture,
    });
  }
  return user;
}
