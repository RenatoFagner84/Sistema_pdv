const bcrypt = require('bcrypt')

const validarSenhaLogin = async (req,res,next) => {
    const { senha } = req.body

    try {
        const senhaValida = await bcrypt.compare(senha, req.usuario.senha)

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida!' })
        }
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()

}

module.exports = validarSenhaLogin
