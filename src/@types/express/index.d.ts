import { ITokenDTO } from '@shared/dtos/ITokenDTO';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      token: ITokenDTO;
    }
  }
}
