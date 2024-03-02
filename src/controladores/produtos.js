const knex = require('../config/conexao')

const cadastrarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    
    try {
        if(req.file){
            const urlPublica = req.url

            const produto = await knex('produtos')
                .insert({
                    descricao,
                    quantidade_estoque,
                    valor,
                    categoria_id,
                    produto_imagem: urlPublica
                })
                .returning('*')
                
            return res.status(201).json(produto)
        }

        const produto = await knex('produtos')
                .insert({
                    descricao,
                    quantidade_estoque,
                    valor,
                    categoria_id
                })
                .returning('*')
                
        return res.status(201).json(produto)
    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
}

const editarProdutos = async (req, res) => {
    const { descricao, quantidade_estoque, valor, categoria_id } = req.body
    const { id } = req.params

    try {
        if(req.file){
            const urlPublica = req.url

            const produtoAtualizado = await knex("produtos")
                .where({ id })
                .update({
                    descricao,
                    quantidade_estoque,
                    valor,
                    categoria_id,
                    produto_imagem: urlPublica
                })

            if (!produtoAtualizado) {
                return res.status(400).json({ mensagem: "O produto não foi atualizado" });
            }
            
            return res.status(200).json({ mensagem: "Produto foi atualizado com sucesso." })
        }

        const produtoAtualizado = await knex("produtos")
                .where({ id })
                .update({
                    descricao,
                    quantidade_estoque,
                    valor,
                    categoria_id
                })

        if (!produtoAtualizado) {
            return res.status(400).json({ mensagem: "O produto não foi atualizado" });
        }
        
        return res.status(200).json({ mensagem: "Produto foi atualizado com sucesso." })
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }
}

const listarProdutos = async (req,res) => {
    try {
        if(req.filtro){
            return res.status(200).json(req.filtro)
        }        
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }
}

const detalharProduto = async (req,res) => {
    const { id } = req.params

    try {
        const produto = await knex('produtos').where({ id }).first()

        return res.status(200).json(produto)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }
}

const deletarProduto = async (req,res) => {
    const { id } = req.params

    try {
        await knex('produtos').delete().where({ id })

        return res.status(200).json({ mensagem: 'Produto deletado com sucesso!'})
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!'})
    }
}

module.exports = {
    cadastrarProdutos,
    editarProdutos,
    listarProdutos,
    detalharProduto,
    deletarProduto
}