import { Router } from 'express';

import { userRoutes } from '@shared/infra/http/routes/user.routes';
import { categoryRoutes } from '@shared/infra/http/routes/category.routes';
import { specificationRoutes } from '@shared/infra/http/routes/specification.routes';
import { authenticateRoutes } from '@shared/infra/http/routes/authenticate.routes';

const routes = Router();

routes.use('/categories', categoryRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', userRoutes);
routes.use('/authenticate', authenticateRoutes);

export { routes };
