# Requisitos da Aplicação

## Cadastro de Carros

### Requisitos Funcionais (RF)
- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias

### Regras de negócio (RN)
- Não deve ser possível cadastrar um carro com uma placa já existente
- Não deve ser possível alterar a placa de um carro já cadastrado
- Ao ser cadastrado, o carro já deve estar disponível
- Apenas administradores podem cadastrar um carro

## Listagem de Carros

### Requisitos Funcionais (RF)
- Deve ser possível listar todos os carros disponíveis
- A listagem deve contemplar os seguintes filtros:
  - Nome da categoria
  - Nome do carro

### Regras de negócio (RN)
- O usuário não precisa estar logado no sistema para visualizar os carros disponíveis

## Cadastro de especificação do carro

### Requisitos Funcionais (RF)
- Deve ser possível cadastrar a especificação de um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

### Regras de negócio (RN)
- Os carros devem estar previamente cadastrados para ter uma especificação
- Uma mesma especificação não pode ser atrelada ao mesmo carro de forma repetida
- Apenas administradores podem cadastrar especificações

## Cadastro de imagens do carro

### Requisitos Funcionais (RF)
- Deve ser possível cadastrar varias imagens para o mesmo carro
- Deve ser possível listar todos os carros (independente da disponibilidade)

### Requisitos Não Funcionais (RNF)
- Usar o multer para upload de imagem no ambiente local

### Regras de negócio (RN)
- Cada carro pode ter uma ou mais imagens atreladas a ele
- Apenas administradores podem cadastrar as imagens do carro

## Aluguel do Carro

### Requisitos Funcionais (RF)
- Deve ser possível cadastrar um aluguel

### Regras de negócio (RN)
- O usuário deve estar logado no sistema
- O aluguel deve ter duração mínima de 24 horas
- O usuário não pode ter dois alugueis no mesmo período
- Um carro não pode ser alugado mais de uma vez para o mesmo período
