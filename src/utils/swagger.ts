// src/utils/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import swaggerDefinitions from './swaggerDefinitions';

const options: swaggerJSDoc.Options = {
  definition: swaggerDefinitions,
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Application) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerSpec;
