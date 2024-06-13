# Talker Manager

## Descrição do Projeto

O Talker Manager é uma aplicação para gerenciar palestrantes, permitindo operações de cadastro, listagem, pesquisa, edição e exclusão de palestrantes.

## Tecnologias Utilizadas

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Executando a Aplicação

Para executar o projeto localmente, siga os passos abaixo:

1. Na raiz do projeto execute os serviços utilizando Docker Compose:

   ```
   docker-compose up -d --build
   ```

2. Acesse o terminal interativo do container da aplicação:

   ```
   docker exec -it talker_manager bash
   ```

3. Inicie a aplicação:

   ```
   npm start
   ```

## Informações Adicionais

Este projeto utiliza Docker para facilitar a configuração do ambiente de desenvolvimento. Certifique-se de ter o Docker e o Docker Compose instalados na sua máquina antes de prosseguir com os passos acima.
