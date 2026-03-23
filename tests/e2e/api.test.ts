import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/main.js';

describe('Express API', () => {
  it('should return 200 on public endpoint', async () => {
    const response = await request(app).get('/v1/public');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('This is a public endpoint');
  });

  it('should return list of customers', async () => {
    const response = await request(app).get('/v1/customer');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should login and return JWT token', async () => {
    const response = await request(app).get('/v1/auth/login');
    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
    expect(response.headers['x-jwt-token']).toBeTruthy();
  });

  it('should reject private endpoint without token', async () => {
    const response = await request(app).get('/v1/private');
    expect(response.status).toBe(401);
  });

  it('should allow access to private endpoint with valid token', async () => {
    const loginResponse = await request(app).get('/v1/auth/login');
    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/v1/private')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('This is a private endpoint');
    expect(response.body.user).toBe('user@example.com');
  });
});
