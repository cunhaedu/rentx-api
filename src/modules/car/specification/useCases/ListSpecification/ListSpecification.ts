import { inject, injectable } from 'tsyringe';

import { ISpecificationDTO } from '@modules/car/specification/dtos/ISpecificationDTO';
import { ISpecificationRepository } from '@modules/car/specification/repositories/ISpecificationRepository';

@injectable()
export class ListSpecification {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute(): Promise<ISpecificationDTO[]> {
    return this.specificationRepository.find();
  }
}
