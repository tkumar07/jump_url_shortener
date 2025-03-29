const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('Auth API Routes', () => {
  let userEmail = `test-${Date.now()}@example.com`;
  let userPassword = 'password123';
  let token;

  // Test user registration
  test('Should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: userEmail,
        password: userPassword
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    token = res.body.token;
  });

  // Test user login
  test('Should login existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userEmail,
        password: userPassword
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test getting user data
  test('Should get user data', async () => {
    const res = await request(app)
      .get('/api/auth/user')
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toEqual(userEmail);
  });
});