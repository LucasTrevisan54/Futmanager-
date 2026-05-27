Claude, chat gpt, lovable prompt: 

Atue como um desenvolvedor Front-end Sênior e professor de programação. Preciso que você escreva o código completo de uma aplicação web com temática de futebol que simula um sistema de cadastro (CRUD) de times. 

Este projeto é para uma disciplina acadêmica e possui restrições estritas que precisam ser seguidas à risca. Não utilize soluções modernas ou avançadas que fujam da base tradicional do desenvolvimento web.

Siga rigorosamente as seguintes diretrizes e restrições:

---

1. RESTRIÇÕES TÉCNICAS E DE ARQUITETURA
* Stack Obrigatória: HTML5, CSS3 e JavaScript puro (Vanilla JS). É terminantemente proibido o uso de qualquer framework (React, Vue, Angular), bibliotecas externas (Bootstrap, Tailwind, jQuery) ou pré-processadores.
* Armazenamento de Dados: Os dados devem ser armazenados obrigatoriamente em um array global contendo APENAS strings (ex: var listaDeTimes = ["Santos", "Flamengo"];). É proibido o uso de objetos ({}).
* Organização do Código: Toda a lógica em JavaScript deve ser estruturada obrigatoriamente dentro de funções nomeadas padrão (ex: function salvarItem() { ... }). Não deve existir código solto no escopo global (com exceção da declaração de variáveis de controle e a chamada inicial de renderização). Não utilize Arrow Functions (=>).
* Modularidade: Forneça o código dividido claramente em 3 arquivos separados: 'index.html', 'style.css' e 'app.js'.

---

 2. REQUISITOS DE FLUXO E TELAS
* Tela de Login: A aplicação deve iniciar exibindo uma tela de login simples (usuário e senha). Enquanto o usuário não estiver autenticado, a tela do CRUD deve ficar oculta.
* Dashboard / Tela do CRUD: Após a autenticação bem-sucedida, a tela de login deve ser ocultada e a tela do CRUD deve se tornar visível, exibindo:
  - Um formulário para adicionar ou editar um time.
  - Uma lista (<ul>) renderizando os times cadastrados no array de strings.
  - Cada item da lista deve possuir um botão "Editar" e um botão "Remover".
* Logout: Deve haver um botão "Sair" na dashboard que limpa a sessão simulada, limpa os campos de texto e faz a aplicação voltar para a tela de login.

---
 3. VALIDAÇÕES E LÓGICA OBRIGATÓRIAS (CRÍTICO)
* Validação de Login: Os campos de usuário e senha não podem ser enviados vazios. Exiba uma mensagem de erro na tela caso aconteça. Para a validação, faça uma checagem simples por uma string fixa (ex: usuario === "admin" && senha === "1234").
* Validação de Cadastro: Nenhum item pode ser salvo se o campo de texto do formulário estiver vazio. O sistema deve barrar a operação e exibir uma mensagem de erro textual diretamente na tela.
* Controle de Edição e Cancelamento: 
  - Ao clicar em "Editar", o nome do time selecionado deve ir para o campo de texto, e um botão "Cancelar" deve aparecer.
  - Se o usuário clicar em "Cancelar" ou tentar confirmar a edição deixando o campo vazio, o item original dentro do array de strings deve permanecer intacto, sem nenhuma alteração.
* Remoção por Posição: A exclusão de um item deve ser baseada estritamente no seu ÍNDICE (index / posição) dentro do array, e nunca pelo valor do texto (não utilize métodos que busquem pelo nome). Isso é obrigatório para garantir que, caso haja dois times com o mesmo nome na lista, o sistema remova apenas o que foi clicado, sem apagar o outro.

---

 4. DESIGN VISUAL
* Aplique uma estilização CSS limpa, organizada e moderna, utilizando uma paleta de cores voltada ao tema futebol (tons de verde, branco e cinza, simulando gramado e ambiente esportivo). 
* Use classes utilitárias simples (como '.oculto { display: none; }') para gerenciar a alternância de telas via JavaScript.

Por favor, forneça os códigos completos do 'index.html', 'style.css' e 'app.js' comentados de forma didática, explicando onde as validações obrigatórias foram aplicadas.

Claude Resposta: Na resposta que o Cluade, fez eu não vi nenhum problema, pois o código e as explicações estavam tudo muito bem organizado.

Chat gpt Reesposta: Na resposta do chat, eu achei que faltou um pouco de explicação, ele apenas soltou o código e só.

lovable: Na resposta do lovable eu achei muito desorganizado, senti que faltoun uma explicação melhor, e uma direção menos confusa.


IA escolhida: Eu escolhi o Claude, pois é uma IA que venho utlizando muito e sempre deixa os códigos bem organizados e explicativos. Ultimamente é a IA que mais vem me passando segurança com os meus códigos.


