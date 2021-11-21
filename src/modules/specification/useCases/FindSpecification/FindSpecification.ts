import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class FindSpecification {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(id: string): Promise<ISpecificationDTO> {
    const specification = await this.specificationRepository.findById(id);

    if (!specification) {
      throw new AppError('Entity not found!', 422);
    }

    return specification;
  }
}
