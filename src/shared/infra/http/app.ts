import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import '@shared/container';
import createConnection from '@shared/infra/typeorm';
import { errorsHandler } from '@shared/handlers/ErrorsHandler';
import swaggerFile from '@shared/swagger/swagger.json';
import { routes } from '@shared/infra/http/routes';

const app = express();

createConnection().then(() => {
  console.log('connect do database');
});

app.use(cors());
app.use(express.json());

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(errorsHandler);

export { app };
