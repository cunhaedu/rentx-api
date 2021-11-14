import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';

import errorsHandler from '@infra/handlers/ErrorsHandler';
import { routes } from '@infra/http/routes';
import swaggerFile from '../swagger/swagger.json';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api_docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.use(errorsHandler);

export { app };
