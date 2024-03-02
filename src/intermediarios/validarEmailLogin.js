const knex = require('../config/conexao')

const validarEmailLogin = async (req, res, next) => {
    const { email } = req.body

    try {   
        const usuario = await knex('usuarios').where({ email }).first()

        if (usuario == undefined) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida!' })
        }

        req.usuario = usuario
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = validarEmailLogin