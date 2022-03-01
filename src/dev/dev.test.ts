import req from 'supertest';

it('should login by userId only', () => {
  req(app).post('/dev/login');
});
