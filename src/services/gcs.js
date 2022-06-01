import fs from "fs"
import Storage from "@google-cloud/storage"
import { FileService } from "medusa-interfaces"

class GCSService extends FileService {
  constructor({ }, options) {
    super()

    this.bucketName_ = options.bucketName
    this.projectId = options.projectId
    this.client_email_ = options.credentials.client_email
    this.private_key_ = options.credentials.private_key
  }

  upload(file) {
    const storage = new Storage({
      projectId: this.projectId,
      credentials: {
        client_email: this.credentials.client_email,
        private_key: this.credentials.private_key,
      }
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
      projectId: this.projectId,
      credentials: {
        client_email: this.credentials.client_email,
        private_key: this.credentials.private_key,
      }
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
