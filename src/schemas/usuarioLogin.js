const joi = require('joi')

const schemaUsuarioLogin = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'Email ou senha inválida!',
        'string.email': 'Email ou senha inválida!',
        'string.empty': 'Email ou senha inválida!'
    }),

    senha: joi.string().required().messages({
        'any.required': 'Email ou senha inválida!',
        'string.empty': 'Email ou senha inválida!'
    })
})

module.exports = schemaUsuarioLogin