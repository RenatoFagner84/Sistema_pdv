const knex = require('../config/conexao')

const validarCliente = async (req,res, next) => {
    const { id } = req.params

    try {
        const clienteExiste = await knex('clientes').where({ id }).first()

        if (!clienteExiste) {
            return res.status(400).json({ mensagem: 'Cliente não foi encontrado, por favor digite um id válido!'})
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }

    next()
}

module.exports = validarCliente