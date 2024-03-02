const knex = require('../config/conexao')

const validarQuantidadeEstoque = async (req,res,next) => {
    const { pedido_produtos } = req.body

    try {
        for(let produto of pedido_produtos) {
            const produtoPedido = await knex('produtos').where({id: produto.produto_id})
            
            if(Number(produto.quantidade_produto) > Number(produtoPedido[0].quantidade_estoque)) {
                return res.status(400).json({ mensagem: `Produto com id ${produto.produto_id} não possui estoque para venda!`})
            }
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = validarQuantidadeEstoque