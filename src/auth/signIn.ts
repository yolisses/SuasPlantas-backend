import { createUser } from "user/createUser";
import { getUserByEmail } from "user/getUserByEmail";
import { User } from "user/User";
import { error } from "utils/error";
import { verifyGoogleToken } from "./verifyGoogleToken";
import { TokenPayload } from "google-auth-library";
import { Point } from "geojson";
import { getLocationByIp } from "location/getLocationByIp";


export async function signIn(googleToken: string, ip: string) {
    let payload: TokenPayload
    try {
        payload = await verifyGoogleToken(googleToken)
    } catch (err) {
        error(400, err.message);
    }
    const { email, name } = payload
    let user: User = await getUserByEmail(email)


    if (!user) {
        const locationData = await getLocationByIp(ip)
        const { latitude, longitude, state, city } = locationData
        const location: Point = {
            type: 'Point',
            coordinates: [latitude, longitude]
        }
        user = await createUser({ name, email, location, state, city })
    }
    return user
}