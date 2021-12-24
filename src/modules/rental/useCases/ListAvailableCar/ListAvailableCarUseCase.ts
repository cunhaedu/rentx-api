import { inject, injectable } from 'tsyringe';

import { ICarDTO } from '@modules/car/dtos/ICarDTO';
import {
  ICarRepository,
  IFindAvailableCarsOptions,
} from '@modules/car/repositories/ICarRepository';

@injectable()
export class ListAvailableCarUseCase {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(data?: IFindAvailableCarsOptions): Promise<ICarDTO[]> {
    return this.carRepository.findAvailable(data);
  }
}
