import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NETHALO API',
      version: '1.0.0',
      description: 'Anti-cyberbullying platform API',
    },
    servers: [{ url: 'http://localhost:3001/api' }],
  },
  apis: ['./server/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}