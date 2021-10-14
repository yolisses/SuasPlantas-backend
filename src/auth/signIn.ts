import { createUser } from "user/createUser";
import { getUserByEmail } from "user/getUserByEmail";
import { User } from "user/User";
import { error } from "utils/error";
import { verifyGoogleToken } from "./verifyGoogleToken";
import { TokenPayload } from "google-auth-library";
import { Point } from "geojson";


export async function signIn(googleToken: string) {
    let payload: TokenPayload
    try {
        payload = await verifyGoogleToken(googleToken)
    } catch (err) {
        error(400, err.message);
    }
    const { email, name } = payload
    let user: User = await getUserByEmail(email)
    const location: Point = {
        type: 'Point',
        coordinates: [21, 32]
    }
    if (!user)
        user = await createUser({ name, email, location })
    return user
}