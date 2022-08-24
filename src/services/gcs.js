/* eslint-disable no-empty-pattern */
import { Storage } from '@google-cloud/storage';
import { FileService } from 'medusa-interfaces';

class GCSService extends FileService {
  constructor({ }, options) {
    super();
    this.bucketName = options.bucketName;
    this.keyFileName = options.keyFileName;
  }

  upload(file) {
    const storage = new Storage({
      keyFilename: this.keyFileName,
    });

    const bucket = storage.bucket(this.bucketName);

    return new Promise((resolve, reject) => {
      bucket.upload(file.path, (err, newfile) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({ url: newfile.publicUrl() });
      });
    });
  }

  delete(file) {
    const storage = new Storage({
      keyFilename: this.keyFileName,
    });

    const bucket = storage.bucket(this.bucketName);

    const fileToDelete = bucket.file(`${file}`);

    return new Promise((resolve, reject) => {
      fileToDelete.delete((err, apiResponse) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(apiResponse);
      });
    });
  }
}

export default GCSService;
