import { generateToken } from "./generateToken";
import { signIn } from "./signIn";

export const AuthController = {
    async signIn(req, res) {
        const { googleToken } = req.body
        const user = await signIn(googleToken)
        const token = generateToken({ id: user.id })
        return res.send({ user, token })
    }
}