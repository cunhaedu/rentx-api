import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';

import errorsHandler from '@infra/handlers/ErrorsHandler';
import { routes } from '@infra/http/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errorsHandler);

export { app };
