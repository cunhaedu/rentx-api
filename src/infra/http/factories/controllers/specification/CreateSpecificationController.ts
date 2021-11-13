import { InMemorySpecificationRepository } from '@modules/specification/repositories/implementations/in-memory/InMemorySpecificationRepository';
import { CreateSpecificationController } from '@modules/specification/useCases/CreateSpecification/CreateSpecificationController';
import { CreateSpecification } from '@modules/specification/useCases/CreateSpecification/CreateSpecification';

export function makeCreateSpecificationController() {
  const specificationRepository = InMemorySpecificationRepository.getInstance();
  const createSpecification = new CreateSpecification(specificationRepository);
  const createSpecificationController = new CreateSpecificationController(
    createSpecification,
  );

  return createSpecificationController;
}
