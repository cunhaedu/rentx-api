import * as jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';

import {
  ITokenManagerProvider,
  IPayload,
  ISignOptions,
} from '@shared/providers/TokenManagerProvider/ITokenManagerProvider';

@injectable()
export class JwtTokenManagerProvider implements ITokenManagerProvider {
  async sign(
    info: IPayload,
    secret: string,
    options: ISignOptions,
  ): Promise<string> {
    return jwt.sign(info, secret, {
      expiresIn: options?.expiresIn ?? '1d',
      subject: options?.subject,
    });
  }

  async verify(token: string, secret: string): Promise<IPayload | Error> {
    return jwt.verify(token, secret);
  }
}
