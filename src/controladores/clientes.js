const knex = require('../config/conexao')

const cadastrarClientes = async (req, res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body

    try {
        const novoCliente = await knex('clientes').insert({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }).returning('*')

        return res.status(201).json(novoCliente[0])

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })

    }
}

const editarClientes = async (req,res) => {
    const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body
    const { id } = req.params

    try {
        await knex('clientes').update({ nome, email, cpf, cep, rua, numero, bairro, cidade, estado }).where({ id })

        return res.status(200).json({ mensagem: 'Cliente atualizado com sucesso!' })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }
}

const listarClientes = async (req, res) => {
    try {
        const clientes = await knex('clientes')

        return res.status(200).json(clientes)
    } catch (error) {
        return res.status(500).json({ error: 'Erro interno no servidor!' })
    }
}

const detalharCliente = async (req, res) => {
    const { id } = req.params
    
    try {
        const cliente = await knex('clientes').where({ id }).first();
        
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente não encontrado, por favor digite um id válido!' })
        }
        
        return res.status(200).json(cliente)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarClientes,
    editarClientes,
    listarClientes,
    detalharCliente
}