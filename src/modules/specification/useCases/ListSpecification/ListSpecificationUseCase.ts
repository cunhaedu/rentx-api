import { inject, injectable } from 'tsyringe';

import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';

@injectable()
export class ListSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute(): Promise<ISpecificationDTO[]> {
    return this.specificationRepository.find();
  }
}
