import { CreateSpecificationController } from '@modules/specification/useCases/CreateSpecification/CreateSpecificationController';
import { CreateSpecification } from '@modules/specification/useCases/CreateSpecification/CreateSpecification';
import { TypeormSpecificationRepository } from '@modules/specification/repositories/implementations/typeorm/TypeormSpecificationRepository';

export function makeCreateSpecificationController(): CreateSpecificationController {
  const specificationRepository = new TypeormSpecificationRepository();
  const createSpecification = new CreateSpecification(specificationRepository);
  const createSpecificationController = new CreateSpecificationController(
    createSpecification,
  );

  return createSpecificationController;
}
