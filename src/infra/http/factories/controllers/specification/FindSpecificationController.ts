import { InMemorySpecificationRepository } from '@modules/specification/repositories/implementations/in-memory/InMemorySpecificationRepository';
import { FindSpecificationController } from '@modules/specification/useCases/FindSpecification/FindSpecificationController';
import { FindSpecification } from '@modules/specification/useCases/FindSpecification/FindSpecification';

export function makeFindSpecificationController() {
  const specificationRepository = InMemorySpecificationRepository.getInstance();
  const findSpecification = new FindSpecification(specificationRepository);
  const findSpecificationController = new FindSpecificationController(
    findSpecification,
  );

  return findSpecificationController;
}
