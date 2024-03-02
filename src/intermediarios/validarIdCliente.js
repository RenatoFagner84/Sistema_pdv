const knex = require('../config/conexao')

const validarIdCliente = async (req,res,next) => {
    const { cliente_id } = req.body

    try {
        const clienteExiste = await knex('clientes').where({ id: cliente_id })

        if(clienteExiste == undefined) {
            return res.status(400).json({ mensagem: 'Cliente não encontrado, por favor digite um id válido!' })
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = validarIdCliente