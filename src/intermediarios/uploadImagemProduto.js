const s3Client = require('../config/s3Cliente')
const { PutObjectCommand } = require('@aws-sdk/client-s3')
const { v4: uuidv4 } = require('uuid');

const uploadImagemProduto = async (req, res, next) => {
  const idProduto = uuidv4()
  
  try {
    if(req.file) {
      const { file } = req

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: `produtos/${idProduto}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      )
  
      const urlPublica = `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_S3}/produtos/${idProduto}`

      req.url = urlPublica
    }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = uploadImagemProduto