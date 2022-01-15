import { createLookingFor } from './createLookingFor';

export const LookingForController = {
  async create(req, res) {
    const { userId } = req.session;
    res.send(await createLookingFor(req.body, userId));
  },
};
