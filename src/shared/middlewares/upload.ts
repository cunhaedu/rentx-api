import multer, { Multer } from 'multer';
import crypto from 'crypto';

const storageTypes = {
  local: multer.diskStorage({
    destination: './tmp',
    filename: (req, file, cb) => {
      crypto.randomBytes(8, (err, hash) => {
        if (err) cb(err, '');

        const fileType = file.originalname.split('.').slice(-1)[0];
        const key = `${hash.toString('hex')}-${Date.now()}.${fileType}`;

        cb(null, key);
      });
    },
  }),
};

export default (size: number, fileFormat: string[]): Multer => {
  return multer({
    limits: { fileSize: size * 1024 },
    storage: storageTypes.local,
    fileFilter: (req, file, cb) => {
      const regex = new RegExp(`\\.(${fileFormat.join('|')})$`);
      if (!file.originalname.match(regex)) {
        return cb(new Error('Please, provide a file with a valid format!'));
      }

      return cb(null, true);
    },
  });
};
