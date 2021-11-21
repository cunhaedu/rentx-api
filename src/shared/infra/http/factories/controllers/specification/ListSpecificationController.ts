import { ListSpecificationController } from '@modules/specification/useCases/ListSpecification/ListSpecificationController';
import { ListSpecification } from '@modules/specification/useCases/ListSpecification/ListSpecification';
import { TypeormSpecificationRepository } from '@modules/specification/repositories/implementations/typeorm/TypeormSpecificationRepository';

export function makeListSpecificationController(): ListSpecificationController {
  const specificationRepository = new TypeormSpecificationRepository();
  const listSpecification = new ListSpecification(specificationRepository);
  const listSpecificationController = new ListSpecificationController(
    listSpecification,
  );

  return listSpecificationController;
}
