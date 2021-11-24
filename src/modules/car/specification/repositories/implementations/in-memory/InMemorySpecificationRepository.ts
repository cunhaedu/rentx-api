import { ISpecificationDTO } from '@modules/car/specification/dtos/ISpecificationDTO';
import { Specification } from '@modules/car/specification/entities/Specification';
import { ISpecificationRepository } from '@modules/car/specification/repositories/ISpecificationRepository';

export class InMemorySpecificationRepository
  implements ISpecificationRepository
{
  private specification: ISpecificationDTO[];

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: InMemorySpecificationRepository;

  private constructor() {
    this.specification = [];
  }

  public static getInstance(): InMemorySpecificationRepository {
    if (!InMemorySpecificationRepository.INSTANCE) {
      InMemorySpecificationRepository.INSTANCE =
        new InMemorySpecificationRepository();
    }

    return InMemorySpecificationRepository.INSTANCE;
  }

  async save({ name, description }: ISpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.specification.push(specification);
    return specification;
  }

  async update(id: string, data: ISpecificationDTO): Promise<void> {
    this.specification.map(category => {
      if (category.id === id) {
        // eslint-disable-next-line no-param-reassign
        category = { ...data, id };
      }

      return category;
    });
  }

  async delete(id: string): Promise<void> {
    this.specification = this.specification.filter(
      category => category.id !== id,
    );
  }

  async find(): Promise<Specification[]> {
    return this.specification.map(category => category);
  }

  async findById(id: string): Promise<Specification | undefined> {
    return this.specification.find(category => category.id === id);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    return this.specification.find(category => category.name === name);
  }
}
