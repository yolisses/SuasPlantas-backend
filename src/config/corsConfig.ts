import cors from 'cors';

export const corsConfig = cors(
  {
    exposedHeaders: 'Authorization',
    credentials: true,
    origin: [
      'http://localhost:3000',
      'https://localhost:3000',
      'http://localhost:4000',
      'https://localhost:4000',
      'https://suasplantas.com',
      'https://suasplantas.com.br',
      'https://www.suasplantas.com',
      'https://www.suasplantas.com.br',
    ],
  },
);
