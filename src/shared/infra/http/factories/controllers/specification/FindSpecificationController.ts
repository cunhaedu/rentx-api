import { FindSpecificationController } from '@modules/specification/useCases/FindSpecification/FindSpecificationController';
import { FindSpecification } from '@modules/specification/useCases/FindSpecification/FindSpecification';
import { TypeormSpecificationRepository } from '@modules/specification/repositories/implementations/typeorm/TypeormSpecificationRepository';

export function makeFindSpecificationController(): FindSpecificationController {
  const specificationRepository = new TypeormSpecificationRepository();
  const findSpecification = new FindSpecification(specificationRepository);
  const findSpecificationController = new FindSpecificationController(
    findSpecification,
  );

  return findSpecificationController;
}
