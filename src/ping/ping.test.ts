import req from 'supertest';
import { app } from '../server';

it('should ping a response', (done) => {
  req(app).get('/ping').expect(200).then((res) => {
    console.log(res);
    done();
  });
});
