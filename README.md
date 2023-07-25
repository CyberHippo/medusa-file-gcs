⚠️ This repo is deprecated and unmaintained ⚠️

---

# medusa-file-gcs

Upload files to a Google Cloud Storage bucket.

## Usage

```bash
npm i @cyberhippo/medusa-file-gcs
```

## Options

You must configure the following parameters in your `medusa-config.js`:

```js
const plugins = [
  {
    resolve: `@cyberhippo/medusa-file-gcs`,
    options: {
      bucketName: "myBucketName",
      keyFileName: "pathToTheServiceAccountJsonKeyFile",
    },
  },
  ...
```
