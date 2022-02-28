import { CreateUserUseCase } from '@modules/user/useCases/CreateUser/CreateUserUseCase';
import { ForgotPasswordUseCase } from '@modules/user/useCases/ForgotPassword/ForgotPasswordUseCase';
import { InMemoryUserRepository } from '@modules/user/repositories/in-memory/InMemoryUserRepository';
import { InMemoryUserTokenRepository } from '@modules/user/repositories/in-memory/InMemoryUserTokenRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';
import { InMemoryEmailProvider } from '@shared/providers/EmailProvider/in-memory/InMemoryEmailProvider';
import { DayJsDateProvider } from '@shared/providers/DateProvider/implementations/DayJsDateProvider';
import { IEmailProvider } from '@shared/providers/EmailProvider/IEmailProvider';
import { FakeEncoderProvider } from '@shared/providers/EncoderProvider/fakes/FakeEncoderProvider';
import { IEncoderProvider } from '@shared/providers/EncoderProvider/IEncoderProvider';
import AppError from '@shared/errors/AppError';

describe('Send Forgot Password Email', () => {
  let userRepository: IUserRepository;
  let userTokenRepository: IUserTokenRepository;

  let encoderProvider: IEncoderProvider;
  let dateProvider: IDateProvider;
  let emailProvider: IEmailProvider;

  let createUserUseCase: CreateUserUseCase;
  let forgotPasswordUseCase: ForgotPasswordUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    userTokenRepository = new InMemoryUserTokenRepository();

    encoderProvider = new FakeEncoderProvider();
    dateProvider = new DayJsDateProvider();
    emailProvider = new InMemoryEmailProvider();

    createUserUseCase = new CreateUserUseCase(userRepository, encoderProvider);

    forgotPasswordUseCase = new ForgotPasswordUseCase(
      userRepository,
      userTokenRepository,
      dateProvider,
      emailProvider,
    );
  });

  it('Should be able to send a forgot password email to user', async () => {
    const sendEmail = jest.spyOn(emailProvider, 'sendMail');

    await createUserUseCase.execute({
      name: 'Joshua Hill',
      email: 'nu@habuwtuh.tz',
      driverLicense: '104634',
      password: '1234',
    });

    await forgotPasswordUseCase.execute('nu@habuwtuh.tz');

    expect(sendEmail).toHaveBeenCalled();
  });

  it('Should not be able to an email if user does not exists', async () => {
    await expect(
      forgotPasswordUseCase.execute('guh@lowiizo.bm'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to create an user token', async () => {
    const generateTokenManager = jest.spyOn(userTokenRepository, 'save');

    await createUserUseCase.execute({
      name: 'Josephine Ortega',
      email: 'nibur@hata.dz',
      driverLicense: '906075',
      password: '1234',
    });

    await forgotPasswordUseCase.execute('nibur@hata.dz');

    expect(generateTokenManager).toHaveBeenCalled();
  });
});
