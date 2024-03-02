const knex = require('../config/conexao')

const validarEmailUsuario = async (req,res,next) => {
    const { email } = req.body

    try {
        if (req.usuario) {
            const { id } = req.usuario
            
            const emailExiste = await knex("usuarios")
            .where({email: email})
            .andWhereNot({id: id})
            .first()

            if (emailExiste) {
                return res
                .status(400)
                .json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
            }
        } else {
            const emailExistente = await knex('usuarios')
            .where({email})
            .first()

            if (emailExistente) {
                return res
                .status(400)
                .json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado.' })
            }
        }
    } catch (error) {
        console.log(error)
        
        return res.status(400).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = validarEmailUsuario