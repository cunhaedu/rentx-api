import { InMemoryUserRepository } from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import { AuthenticateUserUseCase } from '@modules/user/useCases/AuthenticateUser/AuthenticateUserUseCase';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import { CreateUserUseCase } from '@modules/user/useCases/CreateUser/CreateUserUseCase';
import AppError from '@shared/errors/AppError';

let inMemoryUserRepository: InMemoryUserRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe('Authenticate user test suit', () => {
  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
    );
  });

  it('should be able to authenticate a user', async () => {
    const user: IUserDTO = {
      driverLicense: '01203',
      email: 'user@test.com',
      name: 'user name test',
      password: '12345678',
    };

    await createUserUseCase.execute(user);

    const authenticationData = await authenticateUserUseCase.execute(user);

    expect(authenticationData).toHaveProperty('token');
  });

  it('should not be able to authenticate a nonexistent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'invalid@test.com',
        password: '12345678',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect', 422));
  });

  it('should not be able to authenticate a user with invalid password', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'user@test.com',
        password: 'wrong password',
      }),
    ).rejects.toEqual(new AppError('Email or password incorrect', 422));
  });
});
