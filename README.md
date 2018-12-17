# Stack de desenvolvimento

- Editor: VS Code
- Ferramenta de build e automatização de tarefas: Gulp v4.0.0
- Gerenciador de pacotes: NPM v6.4.1
- Linguagem de marcação: HTML5
- Linguagem de programação: JavaScript
- Pré-processador de folha de estilos: SASS/SCSS
- Servidor: Node.js v9.11.1

# Tecnologias e conceitos

**API/JSON**

- Axios para retornar dados da API.
- Feedback para o usuário quando busca não retorna resultados ou é inválida.

**CSS/SASS**

- Breakpoints para definição de medias queries.
- CSS escrito em SASS, compilado de `.scss` para `.css`.
- CSS Flexbox para estruturas internas.
- CSS Grid para estruturas externas.
- Font-family Roboto (Material) importada do Google Fonts via SASS.
- Ícones usando @font-face gerados pelo [Icomoon](https://icomoon.io/) somente com o necessário, focando em performance.
- Melhoria de performance com Gulp e plugins sass, concat e uglify.
- Metodologia de escrita: [B.E.M.](http://getbem.com/) (Block, Element, Modifier).
- Uso de seletores avançados e pseudo-classes.

**HTML**

- HTML5 em arquivos `.html`. E em `.js` para tratar casos específicos (Ex: map em arrays e retornos de API).

**JAVASCRIPT**

- Arquivo externo, com blocos de funções.
- JavaScript puro e jQuery.
- Map em array para retorno de busca de usuários.
- Sem uso de Frameworks e Libs para arquitetura do projeto.
- Validações com ternários para verificação de dados inexistentes ou não disponíveis.

# Instruções para rodar o projeto

- Instalar [Node JS](https://nodejs.org/en/).
- Executar `git clone git@github.com:thallysbezerra/apiGitHub.git` para clonar o projeto.
- Executar `npm install` no diretório raiz do projeto para instalar dependências.
- Executar `npm start` para rodar o projeto.
- Abra o navegador de sua preferência no caminho `http://localhost:8888`.