const knex = require('../config/conexao')

const validarCategoria = async (req, res, next) => {
    const { categoria_id } = req.body
    
    try {
        const categoriaExiste = await knex('categorias').where({ id: categoria_id })
        
        if (categoriaExiste.length == 0) {
            return res.status(400).json({ messagem: 'Categoria inválida, digite uma categoria válida!'})
        }

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }

    next()
}

module.exports = validarCategoria