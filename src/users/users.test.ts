import req from 'supertest';
import { app } from '../server';

it('should return error if user is not authenticated', () => req(app).get('/users/me').expect(403));
