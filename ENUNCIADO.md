# Teste Full Stack

## Ideia base do teste:
Um projeto de listagem de repositórios do Github, com suporte a cadastro/edição do usuário de acesso, visualização de repositórios de terceiros com persistencia de histórico de consulta.

## Recursos técnicos:
O projeto será composto por um frontend, backend e um banco de dados.

- O backend deve conter rotas REST para comunicação com o front;
- O backend que fará as requisições com a API do Github e devolver para o front;
- Todas as rotas do backend (com excessão do login) devem estar protejidos
- O front deve mandar em todas as requisições após login, um token para autenticação (podendo ser um JWT)
- Dados do usuário de acesso devem ser salvos no banco de dados;
- O histórico de consulta pode ser salvo no banco de dados ou localmente no frontend (via Redux, Context API ou até mesmo local storage);


Tecnologias permitidas:

Front:
- React;
- Typescript;
- Redux ou Context API (não obrigatório);
- Pode-se se usar bibliotecas de componentes de terceiros, como MaterialUI ou DevExpress

Backend:
- Node (com Typescript) ou Python;
- Banco relacional (Postgres ou MySql);
- Pode-se usar frameworks como NestJs (Node), Django (Python) e outros;
- Pode-se user ORMs para interagir com o banco de dados


## Links da API do Github:

1 - https://api.github.com/users/nickname <br />
2 - https://api.github.com/users/nickname/repos

Documentação completa:
https://docs.github.com/pt/rest?apiVersion=2022-11-28

---

## Fluxo de navegação e requisitos de negócio:

### Tela "login":

- Ao entrar pela primeira vez, deve ser possível realizar um login ou um cadastro de usuário básico, com email, senha e perfil de usuário do Github.

- Ao realizar o cadastro, o backend deve realizar uma requisição na API do Github (1) e persistir no banco de dados os seguintes dados:
  - nome;
  - tag do usuário;
  - quantidade de seguidores;
  - quantidade de pessoa seguindo o mesmo;
  - quantidade de repositórios;
  - biografica;
  - email;
  - twitter;
  - nome da empresa;
  - site

OBS: caso vier com algum dado com string vazia, salve no banco como `NULL`.

- Ao realizar o login, deve ser feita uma requisição na API para gerar o token de acesso, onde todas as rotas devem ser protegidas por esse token.

- O meu nome (do usuário do Github) aparecerá em todas as telas, no topo em uma topbar fixa, incluindo foto de perfil. Se eu clicar no meu nome, no topo, deve ser redirecionado para a tela de dados do usuário.
---

### Tela inicial/busca:

- Na tela inicial consigo pesquisar um usuário pelo username do Github retornando os repositórios do mesmo em uma nova tela (2).

- Na tela inicial, vejo um botão de histórico, onde quando clicado me leva a uma tela que mostra as últimas 20 pesquisas que fiz.
----

### Tela de repositórios:

- Na tela de listagem de repositórios, deverá exibir:
  - nome do usuário `*`;
  - total repositórios encontrados;
  - listagem de repositórios:
    - nome do repositório;
    - descrição (se houver `**`);
    - linguagem daquele repositório

- Eu consigo abrir cada repositório mostrado clicando nele, indo para o GitHub respectivo.
- Tenho a possibilidade de buscar novamente através de um botão dedicado.

```
* Obs: deverá exibir através de ícone, ou com texto destacado (sublinhado, cor diferente, negrito) o nome do usuário onde é possível clicar e ser redicionado para uma tela com os dados gerais do usuário.
** Obs: se não houver descrição, deve exibir de forma destacada uma mensagem de que não há conteúdo disponível.
```
---

### Tela de histórico:

- Na tela de histórico eu vejo a data e hora de pesquisa, o username, status (se foi localizado com sucesso ou não), e a quantidade de repositórios encontrados.

- Ao clicar no nome do usuário em um item do histórico, deverá abrir a tela de visualização de detalhes do usuário.

- Ao clicar no total de repositórios deverá ser redicionado para a tela de listagem de repositórios.

- Deverá ter um botão com ícone para que eu possa excluir o item do histórico.
----

### Tela de detalhes do usuário:

- Exibir nessa tela os dados do usuário, sendo:
  - nome;
  - tag do usuário;
  - quantidade de seguidores;
  - quantidade de pessoa seguindo o mesmo;
  - quantidade de repositórios `*`;
  - biografica (se houver `**`);
  - email (se houver `**`);
  - twitter (se houver `**` `***`);
  - nome da empresa (se houver `**`);
  - site (se houver `**` `***`)

- Possuir um botão para realizar o logout `****`;

- Essa tela será acessível de duas maneiras:
  - Clicando no perfil do usuário logado;
  - Clicando no perfil do usuário da consulta;

- Se acessar essa tela pelo perfil do usuário logado, deverá ser utilizado os dados cadastrados no banco e ser possível *editar* o perfil. Caso seja acessado pelo usuário consultado, será apenas exibido os dados direto do Github (2) e não deverá exibir os botões de *editar* e *logout*.

- Ao clicar em editar, deve ser possível trocar email, senha e nome de usuário do github.

```
* Obs: deve ser possível, ao clicar no total de repositório e ser redirecionado para a tela de listagem dos mesmos.
** Obs: se não houver descrição, deve exibir de forma destacada uma mensagem de que não há conteúdo disponível.
*** Obs: se houver twitter ou site próprio, ao clicar deve redirecionar para seus respectivos links em uma aba separada.

**** Obs: Ao clicar nesse botão, deve ser redirecionado para a tela de "login".
```
---

### Informações adicionais:

- Se eu fechar a página/app, ao voltar, deverá aparecer o último nome configurado, no topo, indo direto para a tela de busca (tela inicial).
---

## Observações:
- Pode usar algum boilerplate, a questão maior a ser validade será a organização interna.
- Fazer a documentação no Readme do repositório (deploy, dependências, etc) 
- Não há um padrão de design fixo, seja livre na escolha de cores, fontes, e qualquer item que seja da identidade visual.
- Suba para o Github.

[Link para visuaização do fluxo das telas](https://whimsical.com/fullstack-test-ELvd4KquyPoWXhxpidBGfv)

---

BOA SORTE! 😉️

