const joi = require('joi')

const schemaCliente = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório!',
        'string.empty': 'Nome inválido, por favor digite um nome válido!'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório!',
        'string.email': 'Email inválido, por favor digite um email válido!',
        'string.empty': 'Email inválido, por favor digite um email válido!'
    }),

    cpf: joi.string().required().length(11).messages({
        'any.required': 'O campo cpf é obrigatório!',
        'string.empty': 'Cpf inválido, por favor digite um cpf válido!',
        'string.length': 'Cpf inválido, por favor digite um cpf válido!'
    }),

    cep: joi.string().length(8).messages({
        'number.empty': 'Cep inválido, por favor digite um cpf válido!',
        'string.length': 'Cep inválido, por favor digite um cep válido!'
    }),

    rua: joi.string().messages({
        'string.empty': 'Rua inválida, por favor digite uma rua válida!'
    }),

    numero: joi.string().messages({
        'string.empty': 'Número inválido, por favor digite um número válido!'
    }),

    bairro: joi.string().messages({
        'string.empty': 'Bairro inválido, por favor digite um bairro válido!'
    }),

    cidade: joi.string().messages({
        'string.empty': 'Cidade inválida, por favor digite uma cidade válida!'
    }),

    estado: joi.string().messages({
        'string.empty': 'Estado inválido, por favor digite um estado válido!'
    })

})

module.exports = schemaCliente