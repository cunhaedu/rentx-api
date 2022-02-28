import handlebars from 'handlebars';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import fs from 'fs';
import { resolve } from 'path';

import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import { IUserTokenRepository } from '@modules/user/repositories/IUserTokenRepository';
import { IDateProvider } from '@shared/providers/DateProvider/IDateProvider';

import { IEmailProvider } from '@shared/providers/EmailProvider/IEmailProvider';
import { IUserDTO } from '@modules/user/dtos/IUserDTO';
import AppError from '@shared/errors/AppError';
import _email from '@config/email';

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider,
  ) {}

  async execute(email: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const token = uuidV4();

    await this.userTokenRepository.save({
      refreshToken: token,
      expiresDate: this.dateProvider.add(1, 'hours'),
      user,
    });

    this.sendEmailToUser(user, token);

    return token;
  }

  private async sendEmailToUser(user: IUserDTO, token: string): Promise<void> {
    const emailConfig = _email();

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      '..',
      'templates',
      'email',
      'forgotPassword.template.hbs',
    );

    const templateFileContent = fs
      .readFileSync(forgotPasswordTemplate)
      .toString('utf8');

    const mailTemplateParse = handlebars.compile(templateFileContent);

    const mailTemplateVariables = {
      name: user.name,
      link: emailConfig.FORGOT_EMAIL_URL + token,
    };

    this.emailProvider.sendMail({
      to: [{ name: user.name, email: user.email }],
      subject: 'Recuperação de senha',
      body: mailTemplateParse(mailTemplateVariables),
    });
  }
}
