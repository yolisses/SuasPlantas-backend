import { createConnection } from 'typeorm';
import { dbConfig } from '../config/dbConfig';

export async function startDatabase() {
  return createConnection(dbConfig);
}
