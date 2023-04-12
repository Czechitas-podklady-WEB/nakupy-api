import { createServer } from '../dist/server.js';
import supertest from 'supertest';
import { expect } from 'chai';

const serverUrl = 'http://localhost:5000';

const request = supertest(
  createServer({ serverUrl }),
);

const token = process.env.TEST_AUTH_TOKEN;

describe('CORS for /api', () => {
  it('should allow all origins', async function() {
    const response = await request
      .options('/api')
      .set('Origin', 'https://example.com')
      .expect(204);

    expect(response.headers).to.have.property('access-control-allow-origin', '*');
  });
});

describe('GET /api', () => {
  it('should return a greeting resource', async function() {
    const response = await request
      .get('/api')
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
    expect(response.body).to.have.property('result');
    expect(response.body.result).to.have.property('id', 'root');
    expect(response.body.result).to.have.property('message');
  });
});

describe('GET /api/sampleweek', () => {
  it('should return an array of days', async () => {
    const response = await request
      .get('/api/sampleweek')
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
    expect(response.body)
      .to.have.property('result')
      .that.is.an('array')
      .and.has.lengthOf(7);
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
