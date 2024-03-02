const bcrypt = require('bcrypt')
const knex = require('../config/conexao')
const jwt = require('jsonwebtoken')

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        const usuario = await knex('usuarios')
            .insert({ nome, email, senha: senhaCriptografada })
            .returning('*')

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Usuário não cadastrado.' })
        }

        const { senha: _, ...usuarioCadastrado } = usuario[0]

        return res.status(201).json(usuarioCadastrado)

    } catch (error) {
        console.log(error)

        return res.status(500).json({ mensagem: 'Erro interno no servidor' })

    }
}

const logarUsuario = async (req, res) => {
    const usuario = req.usuario

    try {
        const token = jwt.sign({ id: usuario.id }, process.env.senhaJWT, { expiresIn: '8h' })

        const { senha: s, ...usuarioLogado } = usuario

        return res.json({ usuario: usuarioLogado, token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }
}

const obterPerfilUsuarioLogado = async (req, res) => {
    return res.json(req.usuario);
};

const editarUsuarioLogado = async (req, res) => {
    const { nome, email, senha } = req.body
    const { id } = req.usuario

    try {
        const senhaCriptograda = await bcrypt.hash(senha, 10)

        const usuarioAtualizado = await knex("usuarios")
            .where({ id })
            .update({
                nome,
                email,
                senha: senhaCriptograda
            })

        if (!usuarioAtualizado) {
            return res.status(400).json({ mensagem: "O usuario não foi atualizado" });
        }

        return res.status(200).json({ mensagem: "Usuario foi atualizado com sucesso." })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

}

module.exports = {
    cadastrarUsuario,
    logarUsuario,
    editarUsuarioLogado,
    obterPerfilUsuarioLogado
}
