import cors from 'cors';

const whitelist = {
  'https://suasplantas.com': true,
  'https://suasplantas.com.br': true,
  'http://localhost:3000': true,
  'https://localhost:3000': true,
  undefined: true,
};

export const corsConfig = cors({
  origin(origin, callback) {
    console.log({ origin });
    if (whitelist[origin]) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: ['X-Request', 'content-type'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
});
