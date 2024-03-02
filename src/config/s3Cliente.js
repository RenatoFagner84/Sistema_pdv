const { S3Client } = require("@aws-sdk/client-s3")

const s3Client = new S3Client({
    endpoint: `https://${process.env.ENDPOINT_S3}`,
    region: process.env.REGION_BUCKET,
    credentials: {
      accessKeyId: process.env.KEY_ID,
      secretAccessKey: process.env.APP_KEY
    }
})

module.exports = s3Client