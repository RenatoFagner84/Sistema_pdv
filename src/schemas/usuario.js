const joi = require('joi')

const schemaUsuario = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!',
        'string.empty': 'Nome inválido, por favor digite um nome válido!'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'Email inválido, por favor digite um email válido!',
        'string.empty': 'Email inválido, por favor digite um email válido!'
    }),

    senha: joi.string().required().messages({
        'any.required': 'O campo senha é obrigatório!',
        'string.empty': 'Senha inválida, por favor digite um senha válida!'
    })
})

module.exports = schemaUsuario