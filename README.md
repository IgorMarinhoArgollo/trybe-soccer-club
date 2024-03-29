# Trybe Soccer Club

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/IgorMarinhoArgollo/trybe-soccer-club?color=%2304D361">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/IgorMarinhoArgollo/trybe-soccer-club">
  
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/IgorMarinhoArgollo/trybe-soccer-club">
    
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
   
<details>
  <summary><h2>:brazil: Português</h2></summary>
  Esse projeto trata de um ranking de um campeonato de futebol onde é possível, através dos endpoints, consultar as partidas, os times, fazer o login  consultar a função do usuário, além disso é possível se filtrar por partidas terminadas e por rankings em times da casa e visitantes.<br><br>
  O Projeto Trybe Soccer Club foi desenvolvido para fins educacionais no módulo de Backend no Curso de Desenvolvimento Web Full Stack na Trybe e, além da parcela do backend (desenvolvida em Node.js e ExpressJS em TypeScript), o projeto conta com um banco de dados relacionais desenvolvido em MySQL, através da ferramenta de Mapeamento Objeto Relacional (ORM) Sequelize. <br>
  A parcela frontend dessa aplicação web foi desenvolvida e oferecida pela trybe.<br><br>
  
  ## Live
  * Localmente a aplicação está funcionando como deveria, entretanto, tendo em vista a não gratuidade do serviço de banco de dados do Heroku, a implementação do banco não foi realizada. Sendo assim, para testar a aplicação basta realizar os passos indicados na seção como rodar e testar a aplicação.

  ## Objetivos
  * Elaborar o Backend de um gerenciador de tabela de campeonato de futebol;
  * Implementar as rotas: Login, Time, Partida, Ranking e outra para documentação e teste;
  * Implementar as rotas com consultas do banco de dados MySQL utilizando o Sequelize;
  * Adotar boas práticas do ponto de vista de segurança usando: Helmet, Rate-Limit e DotEnv;
  * Utilizar o Swagger para criar a documentação;
  * Utilização do Mapeamento Objeto Relacional (ORM), utilizando Sequelize como ferramenta;
  * Configuração de arquivos Docker para rodar o software;
  * Elaborar testes de integração cobrindo, a princípio, 100% da aplicação (outros testes ainda serão desenvolvidos para melhorar ainda mais a aplicação web);
  * Implementação de endpoints com informações necessárias para a alimentação do frontend fornecido.<br><br>
  
  ## Tecnologias utilizadas
  * node.js
  * Express Js
  * TypeScript
  * Programação Orientada a Objetos (POO)
  * Arquitetura MSC - Model, Service, Controller
  * ORM/Sequelize
  * Commits Semânticos/ Conventional Commits
  * ESLint
  * Docker
  * Helmet
  * Rate-Limit
  * Morgan
  * Swagger
  * Nyc
  * Mocha
  * Chai
  * Sinon
  * DotEnv<br><br>

      
  ## Como Rodar
      
  ### Clonar no seu computador (via SSH)
  No terminal:
  
    git clone git@github.com:IgorMarinhoArgollo/trybe-soccer-club.git
    
  ### Criar o arquivo .env na pasta tsc-backend
  Chaves que devem ser inseridas no arquivo .env dentro da pasta app/backend:
  ```
    JWT_SECRET=jwt_secret
    APP_PORT=3001
    DB_USER=root
    DB_PASS=12345678
    DB_HOST=localhost 
    DB_PORT=3306

  ```
  ### Criar o arquivo .env na pasta tsc-frontend
  Chaves que devem ser inseridas no arquivo .env dentro da pasta app/frontend:
  ```
   SKIP_PREFLIGHT_CHECK=true
  ```

  ### Rodar toda a aplicação
  #### Requisitos:
   * Docker
   * Docker-compose
  
  #### Iniciando todo o projeto
  acesse a pasta /app e passe o seguinte comando no terminal:
  
    docker-compose up

  após a conclusão da configuração do container a aplicação estará disponível no localhost na porta 3000, definida no docker:

  http://localhost:3000
<br><br>

  ### Rodar apenas o backend  
  #### Iniciando a parte do backend
  acesse a pasta /app/backend<br>
  no terminal, para startar o container:
  
    npm run dev

  Após o término da configuração a aplicação estará disponível no localhost na porta definida no .env:
  
  http://localhost:3001

  sendo a documentação disponível em:

  http://localhost:3001/api-docs/

  ## Rotas
  
  * GET /api-docs
  ------------------------
  * POST /login
  * GET /login/validate
  * GET /teams
  * GET /teams/:id
  * GET /matches
  * POST /matches
  * PATCH /matches/:id
  * PATCH /matches/:id/finish
  * GET /leaderboard
  * GET /leaderboard
  * GET /leaderboard
   
  ###
  
A API tem apenas dois endpoints protegidos por token (o endpoint para criar uma partida e o endpoint para obter a posição do usuário) podendo ser acessado com as seguintes credenciais no endpoint de login para a obtenção do token:
     
      ```
      {
        "email": "admin@admin.com",
        "password": "secret_admin"
      }
      ```
   após a obtenção do token no endpoint de login, basta cola-lo em "Bearer " na chave Authorization" do header da requisição, como o exemplo:

   ```
   {
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTgwODE4MSwiZXhwIjoxNjYyNDEyOTgxfQ.usrh36s9E0P45OovNFLGbmuMz8x4C4mNQFoJs2dLLl8"
   }
   ```  
    
  ## Testes Desenvolvidos
  Use npm test para rodar todos os testes e verificar cobertura:<br>

  ![coverage](./app/backend/src/images/coverage.png)

  * Existem dois warning como resultado dos testes:
    * Um trata de to test do .env relacionado a chave secreta do JWT, entretanto como os testes foram de integração e portanto precisam estar corretos para funcionar, ele foi indiretamente testada;
    * O outro warning trata da função que ordena os resultados e que também indiretamente foram testadas já que os testes são de integração e para se obter o resultado correto o teste faz a verificação.

  ## Como contribuir no projeto
  1. Faça um **fork** do projeto;
  2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`;
  3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`;
  4. Envie as suas alterações: `git push origin my-feature`;
  5. Abra o seu pull-request na página do GitHub.<br><br>

  ##  Autor
<a href="https://www.linkedin.com/in/igormarinhoargollo/">
 <img style="border-radius:300px;" src="https://avatars.githubusercontent.com/u/85767736?s=96&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Igor Marinho Argollo</b></sub></a> <a href="https://www.linkedin.com/in/igormarinhoargollo/"></a>
 <br><br>

  ## Licença
  Esse projeto está sob a licença:
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"><br><br>
</details>
  
  ##  
  ## :us: English
  This project deals with a ranking of a soccer championship where it is possible, through the endpoints, to consult the matches, teams, login and consult the user's role, in addition, it is possible to filter by finished games, score of  home's team and visitors.<br><br>
  The Trybe Soccer Club Project was developed for educational purposes in the Backend module of the Full Stack Web Development Course at Trybe and in addition to the backend part (developed in Node.js and ExpressJS in TypeScript), the project has a relational database developed in MySQL, through the Sequelize Object Relational Mapping (ORM) tool. <br>
  The frontend part of this web application was developed and provided by trybe.<br><br>
  
## Live
  * Locally the application is working as it should, however, due to the non-gratuity of the Heroku database service, the database implementation was not carried out. Therefore, to test the application, just follow the steps indicated in the section on how to run and test the application.

## My Goals
* Develop the Backend of a football league table manager;
* Implement the routes: Login, Teams, Matches, Leaderboar and another one for documentation and testing;
* Implement routes with MySQL database queries using Sequelize;
* Adopt best practices from a security point of view using: Helmet, Rate-Limit and DotEnv;
* Use Swagger to create documentation;
* Use of Object Relational Mapping (ORM), using Sequelize as a tool;
* Configuration of Docker files to run the software;
* Develop integration tests covering, in principle, 100% of the application (other tests will still be developed to further improve the web application);
* Implement of endpoints with information needed to feed the provided frontend.<br><br>

## Used Technologies
* node.js
* Express Js
* TypeScript
* Programação Orientada a Objetos (POO)
* Arquitetura MSC - Model, Service, Controller
* ORM/Sequelize
* Commits Semânticos/ Conventional Commits
* ESLint
* Docker
* Helmet
* Rate-Limit
* Morgan
* Swagger
* Nyc
* Mocha
* Chai
* Sinon
* DotEnv<br><br>
    
## How to Run
      
  ### Clone the repository on your computer (via SSH)
  On terminal:
  
    git clone git@github.com:IgorMarinhoArgollo/trybe-soccer-club.git
    
  ### Create .env file on tsc-backend
  These keys mus be inserted on .env file inside app/backend:
  ```
    JWT_SECRET=jwt_secret
    APP_PORT=3001
    DB_USER=root
    DB_PASS=12345678
    DB_HOST=localhost 
    DB_PORT=3306

  ```
  ### Create .env file on tsc-frontend
  These keys mus be inserted on .env file inside app/frontend:
  ```
   SKIP_PREFLIGHT_CHECK=true
  ```

  ### Running on Container
  #### Requirements:
   * Docker
   * Docker-compose
  
  ### Starting all the project
  Go to /app file and use on terminal:
  
    docker-compose up

  After the end of the containers configuration the application will be available on localhost on port 3000, witch was defined on docker files:

  http://localhost:3000

  ### Running only the backend  
  #### Starting the backend portion
  Go to /app/backend,<br>
  On terminal:
  
    npm run dev

  After the end of configuration, the application will be available on localhost on port 3001 witch was defined on .env file:
  
  http://localhost:3001

  To see the API's documentation:

  http://localhost:3001/api-docs/

## Routes

  * GET /api-docs
  ------------------------
  * POST /login
  * GET /login/validate
  * GET /teams
  * GET /teams/:id
  * GET /matches
  * POST /matches
  * PATCH /matches/:id
  * PATCH /matches/:id/finish
  * GET /leaderboard
  * GET /leaderboard
  * GET /leaderboard
  
  ###
  
The API has only two token-protected endpoints (the endpoint to create a match and the endpoint to get the user's position) which can be accessed with the following credentials in the login endpoint to get the token:

      ```
      {
        "email": "admin@admin.com",
        "password": "secret_admin"
      }
      ```
      
   after obtaining the token in the login endpoint, just paste it in "Bearer " in the Authorization key of the request header as example:


  ```
     {
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY2MTgwODE4MSwiZXhwIjoxNjYyNDEyOTgxfQ.usrh36s9E0P45OovNFLGbmuMz8x4C4mNQFoJs2dLLl8"
      }
   ```

## Developed Tests
  Use npm test to run all tests and verify coverage:<br>
  ![coverage](./app/backend/src/images/coverage.png)

* There are two warnings as a result of the tests:
    * One deals with testing the .env related to the JWT secret key, however as the tests were integration tests, it's already inderectly testes, so there's no need do others specific tests;
    * The other warning deals with the function that orders the results and it is also indirectly tested since the the tests are integration tests. Obtaining the right answer in others tests means that the sort function is working properlly.

## How to contribute on the project
  1. Make a **fork** of the project;
  2. Create a new branch with your changes: `git checkout -b my-feature`;
  3. Save your changes and create a commit message explaining what you have done: `git commit -m "feature: My new feature"`;
  4. Send your changes: `git push origin my-feature`;
  5. Open your pull-request on GitHub.<br><br>

##  Author
<a href="https://www.linkedin.com/in/igormarinhoargollo/">
 <img style="border-radius:300px;" src="https://avatars.githubusercontent.com/u/85767736?s=96&v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Igor Marinho Argollo</b></sub></a> <a href="https://www.linkedin.com/in/igormarinhoargollo/"></a>
 <br />
  
  
## License
  This project is under license:
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen"><br><br>
