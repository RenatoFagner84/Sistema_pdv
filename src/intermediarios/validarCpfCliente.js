const knex = require('../config/conexao')

const validarCpfCliente = async (req,res,next) => {
    const { cpf } = req.body
    const { id } = req.params
    
    try {
        if (id) {
            const cpfExiste = await knex('clientes')
            .where({ cpf })
            .andWhereNot({ id })
            .first()

            if (cpfExiste) {
                return res
                .status(400)
                .json({ mensagem: 'Já existe cliente cadastrado com o cpf informado.' })
            }
        } else {
            const cpfExistente = await knex('clientes')
            .where({cpf})
            .first()

            if (cpfExistente) {
                return res
                .status(400)
                .json({ mensagem: 'Já existe cliente cadastrado com o cpf informado.' })
            }
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = validarCpfCliente