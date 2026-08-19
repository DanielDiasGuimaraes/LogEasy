# 📦 LOGEASY — Sistema de Gestão Logística

> 🚧 **Projeto em desenvolvimento**

O **LOGEASY** é um sistema de gestão logística desenvolvido com **Python, Flask, MySQL, HTML, CSS e JavaScript**.

O projeto tem como objetivo desenvolver uma aplicação capaz de auxiliar no controle de operações relacionadas à logística, como **recebimento, conferência, armazenagem, cadastro de produtos, endereçamento e controle de estoque**.

O LOGEASY também representa meu processo de aprendizado e evolução como desenvolvedor, permitindo colocar em prática conhecimentos de programação, banco de dados, desenvolvimento Web, APIs, autenticação e integração entre Front-end e Back-end.

---

## 👨‍💻 Desenvolvedor

**Daniel Dias**

💼 [LinkedIn](https://www.linkedin.com/in/daniel-dias-b31830345/)

🐙 [GitHub](https://github.com/DanielDiasGuimaraes)

---

## 🎯 Objetivo

O objetivo do LOGEASY é desenvolver um sistema de gestão logística que possa representar, de forma prática, diferentes processos encontrados em operações de estoque e armazenagem.

A ideia é permitir o acompanhamento de etapas como:

```text
📦 Produto
   ↓
📥 Recebimento
   ↓
🔎 Conferência
   ↓
🏭 Armazenagem
   ↓
📊 Estoque
   ↓
📤 Expedição
```

O sistema continua sendo desenvolvido e novas funcionalidades são adicionadas conforme o projeto evolui.

---

# 🚧 Status do projeto

O LOGEASY **ainda não está finalizado**.

Algumas funcionalidades já estão implementadas e funcionando, enquanto outras estão incompletas, em desenvolvimento ou passando por testes e melhorias.

Além disso, algumas funcionalidades foram desenvolvidas utilizando abordagens diferentes durante o processo de aprendizado. Essas partes podem futuramente ser revisadas, reorganizadas ou refatoradas.

Isso faz parte do processo de desenvolvimento do projeto.

### Funcionalidades

* [x] Estrutura inicial da aplicação Flask
* [x] Interface Web
* [x] Integração com MySQL
* [x] Login
* [x] Autenticação inicial
* [x] Cadastro de produtos
* [x] Cadastro de endereços
* [x] Recebimento
* [x] Conferência
* [x] Armazenagem
* [x] Controle de estoque
* [ ] Finalização de todas as funcionalidades
* [ ] Melhorias de segurança
* [ ] Refatoração de partes do código
* [ ] Expedição
* [ ] PDV
* [ ] Relatórios
* [ ] Testes automatizados
* [ ] Documentação completa da API

> **Observação:** A lista acima representa o estado atual do desenvolvimento e poderá ser alterada conforme novas funcionalidades forem implementadas.

---

# 🛠️ Tecnologias utilizadas

## 🐍 Back-end

* **Python**
* **Flask**
* **MySQL**
* **mysql-connector**
* **JWT / Flask-JWT-Extended**
* APIs
* JSON

## 🌐 Front-end

* **HTML5**
* **CSS3**
* **JavaScript**
* **Fetch API**
* Manipulação do DOM

## 🔧 Ferramentas

* **Visual Studio Code**
* **Git**
* **GitHub**

---

# 📦 Principais módulos

## 📥 Recebimento

Módulo destinado ao processo de recebimento dos produtos.

A funcionalidade trabalha com informações relacionadas aos produtos recebidos e permite realizar etapas de conferência e registro das quantidades.

---

## 🔎 Conferência

Módulo utilizado para verificar as informações dos produtos durante o processo de recebimento.

O objetivo é permitir a conferência das informações antes que os produtos sejam direcionados para outras etapas do processo logístico.

---

## 🏭 Armazenagem

Módulo responsável pelo processo de armazenagem.

O sistema trabalha com a associação dos produtos aos seus respectivos endereços dentro do estoque.

---

## 📊 Controle de estoque

Módulo destinado ao controle das informações relacionadas aos produtos armazenados.

O objetivo é permitir acompanhar as quantidades e movimentações dos produtos dentro do sistema.

---

## 📦 Cadastro de produtos

Permite cadastrar produtos que serão utilizados nos processos do sistema.

As informações cadastradas são armazenadas no banco de dados MySQL.

---

## 📍 Cadastro de endereços

Permite cadastrar os endereços utilizados para localização dos produtos dentro do ambiente de armazenagem.

---

## 🔐 Login e autenticação

O sistema possui uma estrutura inicial de login e autenticação.

A autenticação está sendo desenvolvida utilizando conceitos relacionados a **JWT**, proteção de rotas e controle de acesso.

Essa parte ainda está em desenvolvimento e poderá passar por alterações e melhorias.

---

# 🔐 Autenticação e segurança

A segurança é uma das partes que ainda estou estudando e desenvolvendo no projeto.

O LOGEASY possui implementações relacionadas a:

* Autenticação de usuários
* JWT
* Proteção de rotas
* Controle de acesso
* Gerenciamento de sessões
* Requisições autenticadas

Entretanto, essas funcionalidades **ainda não devem ser consideradas como uma implementação definitiva de segurança**.

Durante o desenvolvimento, estou aprendendo diferentes formas de proteger uma aplicação Web e algumas dessas implementações ainda estão sendo aprimoradas.

Por isso, partes relacionadas à autenticação e segurança podem sofrer alterações, refatorações ou substituições conforme o projeto evolui.

> ⚠️ **O LOGEASY é um projeto em desenvolvimento e não deve ser considerado uma aplicação pronta para produção.**

---

# 🗄️ Banco de dados

O LOGEASY utiliza **MySQL** para armazenamento das informações.

O banco de dados é utilizado para trabalhar com informações relacionadas a:

* 👤 Usuários
* 📦 Produtos
* 📍 Endereços
* 📥 Recebimentos
* 📊 Estoque
* 🏭 Armazenagem
* 🔄 Movimentações

A comunicação entre o Back-end e o banco de dados é realizada utilizando Python e `mysql-connector`.

---

# 🏗️ Estrutura do projeto

A estrutura atual do projeto segue a organização utilizada pela aplicação Flask.

```text
LOGEASY/
│
├── server.py
├── README.md
│
├── templates/
│   ├── login.html
│   ├── menu.html
│   ├── recebimento.html
│   ├── armazenagem.html
│   ├── estoque.html
│   └── ...
│
└── static/
    │
    ├── script.js
    │
    ├── css/
    │   ├── login.css
    │   ├── menu.css
    │   ├── recebimento.css
    │   ├── armazenagem.css
    │   └── ...
    │
    ├── img/
    │   └── ...
    │
    └── audio/
        └── ...
```

---

# 📄 Organização dos arquivos

## `server.py`

É o arquivo principal do Back-end da aplicação.

Nele estão a aplicação Flask, as rotas e a lógica responsável pela comunicação entre o sistema, o banco de dados e o Front-end.

---

## `templates/`

Pasta destinada às páginas HTML utilizadas pela aplicação Flask.

Cada página representa uma parte da interface do sistema.

---

## `static/`

Pasta destinada aos arquivos estáticos da aplicação.

Dentro dela estão:

* JavaScript
* CSS
* Imagens
* Áudios

---

## `static/script.js`

Arquivo responsável por grande parte da lógica do Front-end.

Nele são realizadas operações como:

* Requisições para o Back-end
* Comunicação com APIs
* Manipulação de elementos HTML
* Atualização de informações na tela
* Tratamento de respostas
* Interações com o usuário

Atualmente, grande parte da lógica JavaScript está concentrada nesse arquivo.

Conforme o projeto evoluir, esse código poderá ser dividido em arquivos menores para facilitar a manutenção.

---

# 🔄 Comunicação Front-end e Back-end

O sistema utiliza JavaScript para realizar requisições ao Back-end Flask.

Um fluxo simplificado pode ser representado assim:

```text
👤 Usuário
   ↓
🌐 HTML
   ↓
⚡ JavaScript
   ↓
📡 Requisição HTTP
   ↓
🐍 Flask
   ↓
🗄️ MySQL
   ↓
🐍 Flask
   ↓
📡 Resposta
   ↓
⚡ JavaScript
   ↓
🌐 Interface
```

---

# 🧠 Conhecimentos aplicados

Durante o desenvolvimento do LOGEASY estão sendo aplicados conhecimentos de:

* Lógica de programação
* Python
* Flask
* HTML
* CSS
* JavaScript
* MySQL
* SQL
* APIs
* JSON
* HTTP
* Fetch API
* Manipulação do DOM
* Autenticação
* JWT
* Integração Front-end e Back-end
* Git
* GitHub
* Estruturação de aplicações Web
* Tratamento de erros
* Debugging

---

# 📚 Aprendizado

O LOGEASY está sendo desenvolvido como uma forma de transformar meus estudos em uma experiência prática de desenvolvimento.

Durante o projeto, estou tendo contato com problemas e situações reais de programação, como:

* Erros de banco de dados
* Erros de API
* Problemas de comunicação entre Front-end e Back-end
* Validação de informações
* Autenticação
* Proteção de rotas
* Manipulação de dados
* Organização de código
* Tratamento de exceções
* Debugging
* Refatoração

Nem todas as funcionalidades possuem o mesmo nível de maturidade.

Algumas estão mais completas, enquanto outras ainda estão sendo desenvolvidas ou testadas.

Também existem funcionalidades que foram implementadas utilizando abordagens diferentes durante meu processo de aprendizado.

Conforme meus conhecimentos evoluem, partes do projeto podem ser modificadas para utilizar soluções mais adequadas.

---

# 🔨 Desenvolvimento contínuo

Uma das características do LOGEASY é que ele está sendo desenvolvido de forma contínua.

Isso significa que:

* O código pode ser alterado.
* Funcionalidades podem ser modificadas.
* Algumas soluções podem ser substituídas.
* Novos módulos podem ser adicionados.
* Bugs podem ser encontrados e corrigidos.
* A estrutura do projeto pode ser reorganizada.

O objetivo não é apenas finalizar o sistema, mas também acompanhar minha evolução como desenvolvedor através do próprio projeto.

---

# 🚀 Próximos passos

Alguns dos objetivos para as próximas etapas são:

* [ ] Finalizar funcionalidades existentes
* [ ] Melhorar a autenticação
* [ ] Aprimorar a implementação de JWT
* [ ] Revisar a proteção das rotas
* [ ] Melhorar o tratamento de erros
* [ ] Refatorar partes do código
* [ ] Organizar melhor o JavaScript
* [ ] Criar novos módulos
* [ ] Desenvolver expedição
* [ ] Desenvolver PDV
* [ ] Criar relatórios
* [ ] Implementar testes
* [ ] Melhorar a documentação
* [ ] Documentar a API
* [ ] Melhorar a interface
* [ ] Preparar versões mais estáveis do sistema

---

# 🔒 Informações sensíveis

Este projeto utiliza informações relacionadas ao banco de dados e autenticação.

Por motivos de segurança, **senhas, tokens, chaves de API e outras informações sensíveis não devem ser enviadas para o GitHub**.

Antes de publicar o projeto, verifique se arquivos como `.env` estão incluídos no `.gitignore`.

Exemplo:

```text
.env
__pycache__/
*.pyc
venv/
.venv/
```

---

# 📈 Evolução do projeto

O LOGEASY representa uma parte importante do meu processo de desenvolvimento.

O projeto começou com funcionalidades menores e vem sendo expandido gradualmente para trabalhar com diferentes processos de uma operação logística.

A intenção é continuar adicionando funcionalidades e, ao mesmo tempo, melhorar a qualidade, organização, segurança e arquitetura do sistema.

---

# 🎓 Objetivo profissional

Além de ser um projeto de aprendizado, o LOGEASY também faz parte da construção do meu portfólio profissional.

Através dele, busco demonstrar na prática minha capacidade de:

* Desenvolver aplicações Web
* Trabalhar com Back-end
* Trabalhar com Front-end
* Criar e consumir APIs
* Trabalhar com bancos de dados
* Resolver problemas de programação
* Investigar e corrigir erros
* Aprender novas tecnologias
* Evoluir um projeto de forma contínua

---

# ⭐ Considerações finais

O **LOGEASY ainda está em desenvolvimento**.

O projeto não pretende representar uma aplicação finalizada ou uma solução comercial pronta neste momento.

Ele representa principalmente meu processo de **aprendizado, prática e evolução como desenvolvedor**.

Algumas funcionalidades estão completas, outras estão em desenvolvimento e outras ainda passarão por melhorias e refatorações.

Este repositório será atualizado conforme o projeto continuar evoluindo.

---

**Daniel Dias**

💼 [LinkedIn](https://www.linkedin.com/in/daniel-dias-b31830345/)

🐙 [GitHub](https://github.com/DanielDiasGuimaraes)

---

# 📦 LOGEASY

**Sistema de Gestão Logística**

🐍 Python • Flask • MySQL • HTML • CSS • JavaScript

> 🚧 Projeto em desenvolvimento — evolução contínua.
