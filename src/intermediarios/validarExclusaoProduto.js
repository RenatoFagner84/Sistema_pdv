const knex = require('../config/conexao')

const validarExclusaoProduto = async (req,res, next) => {
    const { id } = req.params

    try {
        const produtoEmPedido = await knex('pedido_produtos').where({ produto_id: id})

        if(produtoEmPedido.length > 0) {
            return res.status(400).json({ mensagem: 'Não foi possível fazer a exclusão, o produto está inserido em algum pedido do sistema!' })
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }

    next()
}

module.exports = validarExclusaoProduto