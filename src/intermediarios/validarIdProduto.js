const knex = require('../config/conexao')

const validarIdProduto = async (req,res,next) => {
    const { pedido_produtos } = req.body
    
    try {
        const produtoPedido = pedido_produtos.map(async produto => {
            const produtoExiste = await knex('produtos').where({ id: produto.produto_id })
            
            if(produtoExiste.length < 1){
                return res.status(400).json({ mensagem: `Produto com id ${produto.produto_id} não encontrado, digite um id válido!`})
            }
        })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = validarIdProduto