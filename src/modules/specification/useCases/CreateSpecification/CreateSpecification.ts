import AppError from '@infra/errors/AppError';
import { ISpecificationDTO } from '../../dtos/ISpecificationDTO';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

export class CreateSpecification {
  constructor(private specificationRepository: ISpecificationRepository) {}

  async execute(data: ISpecificationDTO): Promise<ISpecificationDTO> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(data.name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification Already exists!');
    }

    return this.specificationRepository.save(data);
  }
}
