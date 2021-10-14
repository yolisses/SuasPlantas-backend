import { signIn } from "./signIn";

export const AuthController = {
    async signIn(req, res) {
        const { googleToken } = req.body
        const user = await signIn(googleToken)
        return res.send(user)
    }
}