import { TokenPayload } from "google-auth-library";
import { createUser } from "user/createUser";
import { getUserByEmail } from "user/getUserByEmail";
import { User } from "user/User";
import { error } from "utils/error";
import { verifyGoogleToken } from "./verifyGoogleToken";

export const AuthController = {
    async signIn(req, res) {
        const { googleToken } = req.body
        let payload: TokenPayload
        try {
            payload = await verifyGoogleToken(googleToken)
        } catch (err) {
            error(400, err);
        }
        const { email, name } = payload
        let user: User = await getUserByEmail(email)
        if (!user)
            user = await createUser({ name, email })
        return res.send(user)
    }
}