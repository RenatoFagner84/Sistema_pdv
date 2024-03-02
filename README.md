
Sistema PDV - Ponto de Venda
O Sistema PDV (Ponto de Venda) é uma API desenvolvida para gerenciar operações em um ambiente de frente de caixa. Este projeto piloto visa criar uma estrutura inicial que será expandida com funcionalidades adicionais no futuro. A API interage com um banco de dados PostgreSQL chamado pdv, o qual deve ser criado conforme instruções fornecidas.

Funcionalidades
1ª Sprint
Banco de Dados
usuarios

id
nome
email (campo único)
senha
categorias

id
descricao
Listar Categorias
GET /categoria

Rota para listar todas as categorias cadastradas.

Cadastrar Usuário
POST /usuario

Rota para cadastrar um novo usuário no sistema.

Efetuar Login do Usuário
POST /login

Rota para permitir o usuário cadastrado realizar o login no sistema.

Detalhar Perfil do Usuário Logado
GET /usuario

Rota para visualizar os dados do perfil do usuário logado.

Editar Perfil do Usuário Logado
PUT /usuario

Rota para o usuário logado atualizar informações do seu próprio cadastro.

Efetuar Deploy da Aplicação
Fazer deploy do projeto e disponibilizar a URL.
2ª Sprint
Banco de Dados
produtos

id
descricao
quantidade_estoque
valor
categoria_id
clientes

id
nome
email (campo único)
cpf (campo único)
cep
rua
numero
bairro
cidade
estado
Cadastrar Produto
POST /produto

Rota para o usuário logado cadastrar um novo produto no sistema.

Editar Dados do Produto
PUT /produto/:id

Rota para o usuário logado atualizar informações de um produto cadastrado.

Listar Produtos
GET /produto

Rota para listar todos os produtos cadastrados, podendo filtrar por categoria.

Detalhar Produto
GET /produto/:id

Rota para o usuário logado obter detalhes de um produto cadastrado.

Excluir Produto por ID
DELETE /produto/:id

Rota para o usuário logado excluir um produto cadastrado.

Cadastrar Cliente
POST /cliente

Rota para o usuário logado cadastrar um novo cliente no sistema.

Editar Dados do Cliente
PUT /cliente/:id

Rota para o usuário logado atualizar informações de um cliente cadastrado.

Listar Clientes
GET /cliente

Rota para listar todos os clientes cadastrados.

Detalhar Cliente
GET /cliente/:id

Rota para o usuário logado obter detalhes de um cliente cadastrado.

3ª Sprint
Banco de Dados
pedidos

id
cliente_id
observacao
valor_total
pedido_produtos

id
pedido_id
produto_id
quantidade_produto
valor_produto
produtos

produto_imagem
Cadastrar Pedido
POST /pedido

Rota para cadastrar um novo pedido no sistema, com detalhes sobre os produtos incluídos.

Listar Pedidos
GET /pedido

Rota para listar todos os pedidos cadastrados, podendo filtrar por cliente.

Aplicar Validação na Exclusão de Produto
Regra que não permitirá a exclusão de um produto vinculado a algum pedido.
Aprimorar Cadastro/Atualização de Produto
Permitir o vínculo de uma imagem a um produto.
Aprimorar Exclusão de Produto
Excluir a imagem vinculada a um produto do servidor de armazenamento durante a exclusão do produto.
Essas funcionalidades representam a base do Sistema PDV, e a API pode ser expandida conforme as necessidades do projeto evoluírem. Certifique-se de seguir os status codes e requisitos obrigatórios conforme documentado.

https://www.linkedin.com/in/renato-fagner-6454b152/
