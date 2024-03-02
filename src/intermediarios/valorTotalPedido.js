const knex = require('../config/conexao')

const valorTotalPedido = async (req,res,next) => {
    const { pedido_produtos } = req.body
    let valorTotal = 0

    try {
        for(let produto of pedido_produtos){
            const produtoPedido = await knex('produtos').where({id: produto.produto_id})

            valorTotal += Number(produto.quantidade_produto) * Number(produtoPedido[0].valor)
        }

        req.valorTotal = valorTotal
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = valorTotalPedido