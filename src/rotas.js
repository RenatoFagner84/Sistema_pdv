const express = require('express')
const upload = require('./config/multer')

const categorias = require('./controladores/categorias')
const usuarios = require('./controladores/usuarios')
const produtos = require('./controladores/produtos')
const clientes = require('./controladores/clientes')
const pedidos = require('./controladores/pedidos')

const verificarUsuarioLogado = require('./intermediarios/autenticacao')

const validarCamposReq = require('./intermediarios/validarCamposReq')
const validarEmailUsuario = require('./intermediarios/validarEmailUsuario')
const validarEmailLogin = require('./intermediarios/validarEmailLogin')
const validarSenhaLogin = require('./intermediarios/validarSenhaLogin')
const validarCategoria = require('./intermediarios/validarCategoria')
const filtroCategoria = require('./intermediarios/filtroCategoria')
const validarProduto = require('./intermediarios/validarProduto')
const validarExclusaoProduto = require('./intermediarios/validarExclusaoProduto')
const validarIdProduto = require('./intermediarios/validarIdProduto')
const validarQuantidadeEstoque = require('./intermediarios/validarQuantidadeEstoque')
const uploadImagemProduto = require('./intermediarios/uploadImagemProduto')
const validarEmailCliente = require('./intermediarios/validarEmailCliente')
const validarCpfCliente = require('./intermediarios/validarCpfCliente')
const validarCliente = require('./intermediarios/validarCliente')
const validarIdCliente = require('./intermediarios/validarIdCliente')
const filtroClientePedido = require('./intermediarios/filtroClientePedido')
const valorTotalPedido = require('./intermediarios/valorTotalPedido')

const schemaUsuario = require('./schemas/usuario')
const schemaUsuarioLogin = require('./schemas/usuarioLogin')
const schemaProduto = require('./schemas/produto')
const schemaCliente = require('./schemas/cliente')
const schemaPedido = require('./schemas/pedidos')
const deletarImagemProduto = require('./intermediarios/deletarImagemProduto')

const rotas = express()

rotas.get('/categoria',
    categorias.listar
)

rotas.post('/usuario',
    validarCamposReq(schemaUsuario),
    validarEmailUsuario,
    usuarios.cadastrarUsuario
)

rotas.post('/login',
    validarCamposReq(schemaUsuarioLogin),
    validarEmailLogin,
    validarSenhaLogin,
    usuarios.logarUsuario
)

rotas.use(verificarUsuarioLogado)

rotas.get('/usuario',
    usuarios.obterPerfilUsuarioLogado
)

rotas.put('/usuario',
    validarCamposReq(schemaUsuario),
    validarEmailUsuario,
    usuarios.editarUsuarioLogado
)

rotas.post('/produto',
    upload.single("produto_imagem"),
    validarCamposReq(schemaProduto),
    validarCategoria,
    uploadImagemProduto,
    produtos.cadastrarProdutos
)

rotas.put('/produto/:id',
    upload.single("produto_imagem"),
    validarProduto,
    validarCamposReq(schemaProduto),
    validarCategoria,
    uploadImagemProduto,
    produtos.editarProdutos
)

rotas.get('/produto',
    filtroCategoria,
    produtos.listarProdutos
)

rotas.get('/produto/:id',
    validarProduto,
    produtos.detalharProduto
)

rotas.delete('/produto/:id',
    validarProduto,
    validarExclusaoProduto,
    deletarImagemProduto,
    produtos.deletarProduto
)

rotas.post('/cliente',
    validarCamposReq(schemaCliente),
    validarEmailCliente,
    validarCpfCliente,
    clientes.cadastrarClientes
)

rotas.put('/cliente/:id',
    validarCamposReq(schemaCliente),
    validarEmailCliente,
    validarCpfCliente,
    clientes.editarClientes
)

rotas.get('/cliente',
    clientes.listarClientes
)

rotas.get('/cliente/:id',
    validarCliente,
    clientes.detalharCliente
)

rotas.post('/pedido',
    validarCamposReq(schemaPedido),
    validarIdCliente,
    validarIdProduto,
    validarQuantidadeEstoque,
    valorTotalPedido,
    pedidos.cadastrarPedido
)

rotas.get('/pedido',
    filtroClientePedido,
    pedidos.listarPedidos
)

module.exports = rotas