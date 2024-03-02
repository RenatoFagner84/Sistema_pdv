const knex = require('../config/conexao')

const filtroClientePedido = async (req, res, next) => {
    let lista = []

    try {
        const { cliente_id } = req.query
        
        if(cliente_id == undefined){
            const listaPedidos = await knex('pedidos')

            for(let pedido of listaPedidos){
                let listaPedidoProdutos = await knex('pedido_produtos').where({ pedido_id: pedido.id })

                lista.push({
                    pedido: {
                        id: pedido.id,
                        valor_total: pedido.valor_total,
                        observacao: pedido.observacao,
                        cliente_id: pedido.cliente_id
                    },
                    pedido_produtos: listaPedidoProdutos
                })
            }

            return res.status(200).json(lista)
        }

        const clienteExiste = await knex('clientes').where({ id: cliente_id })

        if (clienteExiste.length == 0) {
            return res.status(400).json({ messagem: 'Cliente inválido, digite um id de cliente válido!'})
        }

        const listaPedidosCliente = await knex('pedidos').where({ cliente_id })

        for(let pedido of listaPedidosCliente){
            let listaPedidoProdutos = await knex('pedido_produtos').where({ pedido_id: pedido.id })

            lista.push({
                pedido: {
                    id: pedido.id,
                    valor_total: pedido.valor_total,
                    observacao: pedido.observacao,
                    cliente_id: pedido.cliente_id
                },
                pedido_produtos: listaPedidoProdutos
            })
        }

        req.filtro = lista
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = filtroClientePedido