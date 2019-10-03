import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        // 7772317236.png (ex) - filename
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
