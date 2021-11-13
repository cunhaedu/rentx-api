import AppError from '@infra/errors/AppError';
import { ISpecificationDTO } from '../../dtos/ISpecificationDTO';
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository';

export class FindSpecification {
  constructor(private specificationRepository: ISpecificationRepository) {}

  async execute(id: string): Promise<ISpecificationDTO> {
    const specification = await this.specificationRepository.findById(id);

    if (!specification) {
      throw new AppError('Entity not found!', 422);
    }

    return specification;
  }
}
