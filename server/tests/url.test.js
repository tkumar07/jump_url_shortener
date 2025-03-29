const request = require('supertest');
const app = require('../index');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Mock token for testing
const token = jwt.sign(
  { user: { id: 'test@example.com' } },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

describe('URL API Routes', () => {
  // Test creating a short URL
  test('Should create a short URL', async () => {
    const res = await request(app)
      .post('/api/urls')
      .set('x-auth-token', token)
      .send({ originalUrl: 'https://example.com' });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('shortId');
    expect(res.body).toHaveProperty('originalUrl');
    expect(res.body.originalUrl).toEqual('https://example.com');
  });

  // Test getting user URLs
  test('Should get all user URLs', async () => {
    const res = await request(app)
      .get('/api/urls')
      .set('x-auth-token', token);
    
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test unauthorized access
  test('Should deny access without token', async () => {
    const res = await request(app)
      .get('/api/urls');
    
    expect(res.statusCode).toEqual(401);
  });
});