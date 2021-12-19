import { ICarImageRepository } from '@modules/car/repositories/ICarImageRepository';
import { ICarImageDTO } from '@modules/car/dtos/ICarImageDTO';
import { CarImage } from '@modules/car/infra/typeorm/entities/CarImage';

export class InMemoryCarImageRepository implements ICarImageRepository {
  private readonly carImages: ICarImageDTO[];

  constructor() {
    this.carImages = [];
  }

  async save(data: ICarImageDTO): Promise<ICarImageDTO> {
    const carImage = new CarImage();

    Object.assign(carImage, {
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.carImages.push(carImage);
    return carImage;
  }
}
