import { generateToken } from "./generateToken";
import { signIn } from "./signIn";

export const UploadController = {
  async getLink(req, res) {
    const { ip } = req;
    const { googleToken } = req.body;
    const user = await signIn(googleToken, ip);
    const token = generateToken({ id: user.id });
    return res.send({ user, token });
  },
};
