const knex = require('../config/conexao')

const validarEmailCliente = async (req,res,next) => {
    const { email } = req.body
    const { id } = req.params

    try {
        if (id) {
            const emailExiste = await knex('clientes')
            .where({ email })
            .andWhereNot({ id })
            .first()

            if (emailExiste) {
                return res
                .status(400)
                .json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' })
            }
        } else {
            const emailExistente = await knex('clientes')
            .where({ email })
            .first()

            if (emailExistente) {
                return res
                .status(400)
                .json({ mensagem: 'Já existe cliente cadastrado com o e-mail informado.' })
            }
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = validarEmailCliente