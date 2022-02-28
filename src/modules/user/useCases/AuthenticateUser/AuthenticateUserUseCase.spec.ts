import { InMemoryUserRepository } from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import { AuthenticateUserUseCase } from '@modules/user/useCases/AuthenticateUser/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@modules/user/useCases/CreateUser/CreateUserUseCase';
import { InMemoryUserTokenRepository } from '@modules/user/repositories/in-memory/InMemoryUserTokenRepository';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';

import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import { ITokenManagerProvider } from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';
import { DayJsDateProvider } from '@shared/providers/DateProvider/implementations/DayJsDateProvider';
import { FakeEncoderProvider } from '@shared/providers/EncoderProvider/fakes/FakeEncoderProvider';
import { FakeTokenManagerProvider } from '@shared/providers/TokenManagerProvider/fakes/FakeTokenManagerProvider';

import AppError from '@shared/errors/AppError';

let inMemoryUserRepository: InMemoryUserRepository;
let inMemoryUserTokenRepository: InMemoryUserTokenRepository;

let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

let dateProvider: IDateProvider;
let encoderProvider: IEncoderProvider;
let tokenManagerProvider: ITokenManagerProvider;

describe('Authenticate user test suit', () => {
  beforeAll(() => {
    inMemoryUserRepository = new InMemoryUserRepository();
    inMemoryUserTokenRepository = new InMemoryUserTokenRepository();

    dateProvider = new DayJsDateProvider();
    encoderProvider = new FakeEncoderProvider();
    tokenManagerProvider = new FakeTokenManagerProvider();

    createUserUseCase = new CreateUserUseCase(
      inMemoryUserRepository,
      encoderProvider,
    );
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUserRepository,
      inMemoryUserTokenRepository,
      dateProvider,
      encoderProvider,
      tokenManagerProvider,
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
    expect(authenticationData).toHaveProperty('refreshToken');
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
