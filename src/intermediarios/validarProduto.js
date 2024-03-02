const knex = require('../config/conexao')

const validarProduto = async (req,res, next) => {
    const { id } = req.params

    try {
        const produtoExiste = await knex('produtos').where({ id }).first()

        if (!produtoExiste) {
            return res.status(400).json({ mensagem: 'Produto não encontrado, por favor digite um id válido!'})
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }

    next()
}

module.exports = validarProduto