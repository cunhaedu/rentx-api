import { InMemorySpecificationRepository } from '@modules/specification/repositories/implementations/in-memory/InMemorySpecificationRepository';
import { ListSpecificationController } from '@modules/specification/useCases/ListSpecification/ListSpecificationController';
import { ListSpecification } from '@modules/specification/useCases/ListSpecification/ListSpecification';

export function makeListSpecificationController() {
  const specificationRepository = InMemorySpecificationRepository.getInstance();
  const listSpecification = new ListSpecification(specificationRepository);
  const listSpecificationController = new ListSpecificationController(
    listSpecification,
  );

  return listSpecificationController;
}
