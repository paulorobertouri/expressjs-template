import { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import { Providers } from '../di/providers.js';
import { createJWTMiddleware } from '../middleware/auth.js';

const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Express.js Template API',
    version: '1.0.0',
    description: 'Modern Express.js API with JWT authentication',
  },
  paths: {
    '/v1/public': {
      get: {
        tags: ['Public'],
        summary: 'Public endpoint',
        responses: {
          '200': {
            description: 'Success',
          },
        },
      },
    },
    '/v1/customer': {
      get: {
        tags: ['Public'],
        summary: 'Get customers',
        responses: {
          '200': {
            description: 'List of customers',
          },
        },
      },
    },
    '/v1/auth/login': {
      get: {
        tags: ['Auth'],
        summary: 'Login and get JWT token',
        responses: {
          '200': {
            description: 'JWT token',
          },
        },
      },
    },
    '/v1/private': {
      get: {
        tags: ['Protected'],
        summary: 'Protected endpoint requiring JWT',
        security: [{ Bearer: [] }],
        responses: {
          '200': {
            description: 'Success',
          },
          '401': {
            description: 'Unauthorized',
          },
        },
      },
    },
  },
};

export const registerRoutes = (app: Express, providers: Providers) => {
  // Swagger documentation
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Public routes
  app.get('/v1/public', (req: Request, res: Response) => {
    return res.json({ message: 'This is a public endpoint' });
  });

  app.get('/v1/customer', async (req: Request, res: Response) => {
    try {
      const customers = await providers.customerService.listCustomers();
      return res.json(customers);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch customers' });
    }
  });

  // Auth routes
  app.get('/v1/auth/login', (req: Request, res: Response) => {
    try {
      const token = providers.authService.issueToken('user@example.com');
      res.set('Authorization', `Bearer ${token}`);
      res.set('X-JWT-Token', token);
      return res.json({ token });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to generate token' });
    }
  });

  // Protected routes
  const jwtMiddleware = createJWTMiddleware(providers.authService);
  app.get('/v1/private', jwtMiddleware, (req: Request, res: Response) => {
    const user = (req as any).user;
    return res.json({ message: 'This is a private endpoint', user });
  });
};
