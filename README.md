# Desafio Ecotrace

## Sobre

Um projeto de listagem de repositórios do Github, com suporte a cadastro/edição do usuário de acesso, visualização de repositórios de terceiros com persistencia de histórico de consulta.

## Tecnologias Utilizadas

Front-end

* Reactjs (Vite)
* TypeScript
* TailwindCSS
* ShadCN

Back-end

* Nodejs
* ExpressJs
* Express-Validator
* PostgresSQL
* Prisma
* Axios

## Como Executar

1. Clone o Projeto

   ```bash
   git clone https://github.com/felipolis/desafio-ecotrace.git
   cd desafio-ecotrace
   ```
2. Crie o arquivo das variaveis de ambiente no servidor

   ```bash
   cd api
   cp .env.example .env
   ```
3. Instale as dependencias e execute o servidor

   ```bash
   yarn
   yarn dev
   ```
4. Instale as dependencias e execute o cliente

   ```bash
   cd ..
   cd cliente
   yarn
   yarn dev
   ```
