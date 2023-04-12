import express from 'express';
import { weekController } from './controllers/week-controller.js';
import { findUser, users, User } from './controllers/users-db.js';
import { kodimAuth } from '@kodim/auth';
import jsonder from 'jsonder';
import { success } from 'monadix/result';

declare global {
  namespace Express {
    export interface Request {
      apiUser?: User;
    }
  }
}

interface ServerOptions {
  serverUrl: string;
}

export const createServer = ({ serverUrl }: ServerOptions) => {
  const server = express();

// server.use(`${baseUrl}/docs`, express.static('docs/_site', {
//   extensions: ['html'],
// }));

  const api = jsonder({
    generateUrls: {
      serverUrl,
    }
  });
      
  server.use('/api', api.middleware());

  server.get('/api',
    api.endpoint({
      resourceType: 'root',
      handler: () => success({
        id: 'root',
        message: 'Welcome to the Nákupy API',
        docs: `${serverUrl}/docs`,
      }),
    }),
  );

  server.use('/api/sampleweek', weekController(api, { isSampleWeek: true }));

  server.use('/api/me', kodimAuth());

  server.use(
    '/api/me',
    (req, res, next) => {
      findUser(req.user!.email).match({
        success(user) {
          req.apiUser = user;
          next();
        },
        fail() {
          api.sendFail(res, {
            status: 500,
            code: 'internal_error',
            detail: 'User not found',
          })
        },
      });
    },
  );

  server.get(
    '/api/me',
    api.endpoint({
      resourceType: 'user',
      handler: (req) => findUser(req.user!.email).orElse(() => ({
        status: 404,
        code: 'not_found',
        detail: 'User not found',
      }))
    }),
  );

  server.use('/api/me/week',
    weekController(api, { isSampleWeek: false }),
  );

  return server;
};
