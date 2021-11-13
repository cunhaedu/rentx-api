import { ISpecificationDTO } from '../../dtos/ISpecificationDTO';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

export class ListSpecification {
  constructor(private specificationRepository: ISpecificationRepository) {}

  async execute(): Promise<ISpecificationDTO[]> {
    return this.specificationRepository.find();
  }
}
