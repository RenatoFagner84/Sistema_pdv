const knex = require('../config/conexao')

const filtroCategoria = async (req, res, next) => {
    try {
        const { categoria_id } = req.query
        
        if(categoria_id == undefined){
            const listaProdutos = await knex('produtos')

            return res.status(200).json(listaProdutos)
        }

        const categoriaExiste = await knex('categorias').where({ id: categoria_id })

        if (categoriaExiste.length == 0) {
            return res.status(400).json({ messagem: 'Categoria inválida, digite uma categoria válida!'})
        }

        const produtoPorCategoria = await knex('produtos').where({ categoria_id })

        req.filtro = produtoPorCategoria
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' })
    }

    next()
}

module.exports = filtroCategoria