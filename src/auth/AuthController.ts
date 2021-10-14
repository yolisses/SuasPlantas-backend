import { signIn } from "./signIn";

export const AuthController = {
    async signIn(req, res) {
        const { googleToken } = req.body
        signIn(googleToken)
    }
}