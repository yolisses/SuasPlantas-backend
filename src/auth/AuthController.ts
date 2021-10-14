import { generateToken } from "./generateToken";
import { signIn } from "./signIn";

export const AuthController = {
    async signIn(req, res) {
        const { googleToken } = req.body

        let user
        user = await signIn(googleToken)
        console.error(user)
        const token = generateToken({ id: user.id })
        return res.send({ user, token })
    }
}