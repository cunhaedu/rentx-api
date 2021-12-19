import { ISpecificationDTO } from '@modules/specification/dtos/ISpecificationDTO';
import { ISpecificationRepository } from '@modules/specification/repositories/ISpecificationRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository,
  ) {}

  async execute(data: ISpecificationDTO): Promise<ISpecificationDTO> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(data.name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification Already exists!');
    }

    return this.specificationRepository.save(data);
  }
}
