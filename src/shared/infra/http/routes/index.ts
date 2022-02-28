import { Router } from 'express';

import { userRoutes } from '@shared/infra/http/routes/user.routes';
import { categoryRoutes } from '@shared/infra/http/routes/category.routes';
import { specificationRoutes } from '@shared/infra/http/routes/specification.routes';
import { authenticateRoutes } from '@shared/infra/http/routes/authenticate.routes';
import { carRoutes } from '@shared/infra/http/routes/car.routes';
import { rentalRoutes } from '@shared/infra/http/routes/rental.routes';
import { passwordRoutes } from '@shared/infra/http/routes/password.routes';


const routes = Router();

routes.use('/authenticate', authenticateRoutes);
routes.use('/password', passwordRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/specifications', specificationRoutes);
routes.use('/users', userRoutes);
routes.use('/cars', carRoutes);
routes.use('/rentals', rentalRoutes);

export { routes };
