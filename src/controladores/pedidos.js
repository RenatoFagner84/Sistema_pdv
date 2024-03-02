const knex = require('../config/conexao')
const transport = require('../config/email')

const cadastrarPedido = async (req,res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body
    const valorTotal = req.valorTotal

    try {
        const novoPedido = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: valorTotal
        }).returning('*')
        
        pedido_produtos.map(async produto => {
            const valorProduto = await knex('produtos').where({ id: produto.produto_id})

                await knex('pedido_produtos').insert({
                        pedido_id: novoPedido[0].id,
                        produto_id: produto.produto_id,
                        quantidade_produto: produto.quantidade_produto,
                        valor_produto: valorProduto[0].valor
                })
        })


        const emailCliente = await knex('clientes').where({ id: cliente_id }).first()

        transport.sendMail({
            from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
            to: `${emailCliente.nome} <${emailCliente.email}>`,
            subject: "Pedido Concluído", 
            text: "Pedido cadastrado no sistema!"
          });

        return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso!' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

const listarPedidos = async (req, res) => {
    const listaPedido = req.filtro
    try {
        return res.status(200).json(listaPedido)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

module.exports = {
    cadastrarPedido,
    listarPedidos
}