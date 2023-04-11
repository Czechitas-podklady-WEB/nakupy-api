import { createServer } from '../dist/server.js';
import supertest from 'supertest';
import { expect } from 'chai';

const serverUrl = 'http://localhost:5000';

const request = supertest(
  createServer({ serverUrl }),
);

const token = process.env.TEST_AUTH_TOKEN;

describe('GET /api/sampleweek', () => {
  it('should return an array of days', async () => {
    const response = await request
      .get('/api/sampleweek')
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
    expect(response.body).to.have.property('result').that.is.an('array');
  });
});

describe('GET /api/me', () => {
  it('should return a user', async () => {
    const response = await request
      .get('/api/sampleweek')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
  });
});

describe('GET /api/me/week', () => {
  it('should return an array of days', async () => {
    const response = await request
      .get('/api/me/week')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
    expect(response.body).to.have.property('result').that.is.an('array');
  });
});
