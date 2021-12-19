import multer, { Multer } from 'multer';
import crypto from 'crypto';
import { resolve } from 'path';

interface IMulterRequest {
  size?: number;
  fileFormat: string[];
  folder: string;
}

const storageTypes = {
  local(folder: string) {
    return multer.diskStorage({
      destination: resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        'uploads',
        folder,
      ),
      filename: (request, file, cb) => {
        crypto.randomBytes(8, (err, hash) => {
          if (err) cb(err, '');

          const fileType = file.originalname.split('.').slice(-1)[0];
          const key = `${hash.toString('hex')}-${Date.now()}.${fileType}`;

          cb(null, key);
        });
      },
    });
  },
};

export default ({
  size = 2048,
  fileFormat,
  folder,
}: IMulterRequest): Multer => {
  return multer({
    limits: { fileSize: size * 1024 },
    storage: storageTypes.local(folder),
    fileFilter: (request, file, cb) => {
      const regex = new RegExp(`\\.(${fileFormat.join('|')})$`);
      if (!file.originalname.match(regex)) {
        return cb(new Error('Please, provide a file with a valid format!'));
      }

      return cb(null, true);
    },
  });
};
