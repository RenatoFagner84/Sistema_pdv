const s3Client = require('../config/s3Cliente')
const { DeleteObjectCommand } = require('@aws-sdk/client-s3')
const knex = require('../config/conexao')

const deletarImagemProduto = async (req,res,next) => {
    const { id } = req.params
    const produto = await knex('produtos').where({ id }).first()

    try {
        if(produto.produto_imagem){
            const key = produto.produto_imagem.slice(51, produto.produto_imagem.length)

            await s3Client.send(
                new DeleteObjectCommand({
                  Bucket: process.env.BUCKET_NAME,
                  Key: key
                })
              )
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = deletarImagemProduto