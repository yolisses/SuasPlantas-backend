import { getFusers } from './getFusers';

export const FuserController = {
  async get(req, res) {
    const { page, ...rest } = req.query;
    const fusers = await getFusers({
      page: Number(page) || 0,
      ...rest,
    });
    res.send(fusers);
  },
};
