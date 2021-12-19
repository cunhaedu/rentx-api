import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from '@modules/car/useCases/UploadCarImage/UploadCarImageUseCase';

export class UploadCarImageController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const images = <Express.Multer.File[]>req.files;

      const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

      res.json(
        await uploadCarImageUseCase.execute({
          id,
          images: images.map(image => image.filename),
        }),
      );
    } catch (error) {
      next(error);
    }
  }
}
