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

describe('GET /api/me/week/mon', () => {
  it('should return resource for a day', async () => {
    const response = await request
      .get('/api/me/week/mon')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
    expect(response.body).to.have.property('result').that.is.an('object');
    expect(response.body.result).to.have.property('id', 'mon');
    expect(response.body.result).to.have.property('dayName', 'Pondělí');
    expect(response.body.result).to.have.property('items').that.is.an('array').of.length(7);
  });
});

describe('GET /api/me/week/mon/items/D90gKF7I', () => {
  it('should return item with a given id', async () => {
    const response = await request
      .get('/api/me/week/mon/items/D90gKF7I')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
    expect(response.body).to.have.property('result').that.deep.equals({
      id: 'D90gKF7I',
      product: 'Rohlíky',
      amount: 10,
      unit: 'ks',
      done: true,
      url: `${serverUrl}/api/me/week/mon/items/D90gKF7I`,
    });
  });
});

describe('PATCH /api/me/week/mon/items/D90gKF7I', () => {
  it('should set item with id D90gKF7I as not done', async () => {
    const response = await request
      .patch('/api/me/week/mon/items/D90gKF7I')
      .set('Authorization', `Bearer ${token}`)
      .send({ done: false})
      .expect(200);

    expect(response.body).to.have.property('status').that.equals('success');
    expect(response.body).to.have.property('result').that.deep.equals({
      id: 'D90gKF7I',
      product: 'Rohlíky',
      amount: 10,
      unit: 'ks',
      done: false,
      url: `${serverUrl}/api/me/week/mon/items/D90gKF7I`,
    });
  });
});
