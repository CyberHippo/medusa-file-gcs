import { Storage } from "@google-cloud/storage"
import { FileService } from "medusa-interfaces"

class GCSService extends FileService {
  constructor({ }, options) {
    super()
    this.bucketName = options.bucketName
    this.key_file_name = options.key_file_name
  }

  upload(file) {
    const storage = new Storage({
      keyFilename: this.key_file_name,
    })

    const bucket = storage.bucket(this.bucketName)

    return new Promise((resolve, reject) => {
      bucket.upload(file.path, (err, newfile) => {
        if (err) {
          reject(err)
          return
        }

        resolve({ url: newfile.publicUrl()})
      })
    })
  }

  delete(file) {
    const storage = new Storage({
      keyFilename: this.key_file_name,
    })

    const bucket = storage.bucket(this.bucketName)

    const fileToDelete = bucket.file(`${file}`)

    return new Promise((resolve, reject) => {
      fileToDelete.delete((err, apiResponse) => {
        if (err) {
          reject(err)
          return
        }
        resolve(apiResponse)
      })
    })
  }
}

export default GCSService
