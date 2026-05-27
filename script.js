/* ================================================================
   app.js — FootManager
   Toda a lógica da aplicação em JavaScript puro (Vanilla JS).

   RESTRIÇÕES SEGUIDAS:
   ✅ Apenas funções nomeadas (sem arrow functions =>)
   ✅ Array global de STRINGS apenas (sem objetos {})
   ✅ Nenhum código solto no escopo global (exceto variáveis de
      controle e a chamada inicial de renderização no final)
   ✅ Remoção por índice (nunca por valor/nome)
   ✅ Sem frameworks, bibliotecas ou módulos externos

   Estrutura:
     BLOCO A — Variáveis de controle (escopo global, permitidas)
     BLOCO B — Funções de Autenticação (Login / Logout)
     BLOCO C — Funções de CRUD (Salvar / Editar / Remover / Cancelar)
     BLOCO D — Funções de Renderização e UI
     BLOCO E — Inicialização
================================================================ */


/* ================================================================
   BLOCO A — VARIÁVEIS DE CONTROLE (Escopo global)
   Permitidas pelas instruções como "variáveis de controle".
   São o estado mínimo que o JS precisa acompanhar globalmente.
================================================================ */

/*
 * O array principal da aplicação.
 * RESTRIÇÃO CUMPRIDA: contém APENAS strings. Nenhum objeto {}.
 * Exemplo após cadastros: ["Santos FC", "Flamengo", "Palmeiras"]
 */
var listaDeTimes = [];

/*
 * Guarda o índice do time que está sendo editado no momento.
 * -1 significa "modo de adição" (nenhuma edição em andamento).
 * Quando o usuário clica em "Editar", este valor é atualizado
 * com o índice do item clicado.
 */
var indiceEmEdicao = -1;

/*
 * Simula uma sessão de usuário.
 * false = usuário não autenticado (tela de login visível).
 * true  = usuário autenticado (dashboard visível).
 */
var usuarioLogado = false;


/* ================================================================
   BLOCO B — FUNÇÕES DE AUTENTICAÇÃO
================================================================ */

/*
 * realizarLogin()
 * Chamada pelo onclick do botão "Entrar" na tela de login.
 *
 * VALIDAÇÕES APLICADAS:
 *   1. Campos não podem estar vazios.
 *   2. Credenciais fixas: usuário "admin", senha "1234".
 *
 * Fluxo:
 *   - Lê os campos de usuário e senha.
 *   - Verifica se estão vazios → exibe erro e para.
 *   - Verifica se batem com as credenciais fixas → exibe erro e para.
 *   - Se tudo ok: oculta login, exibe dashboard, atualiza estado.
 */
function realizarLogin() {
  /* Captura os valores dos inputs de login */
  var usuario = document.getElementById("input-usuario").value.trim();
  var senha    = document.getElementById("input-senha").value.trim();

  /* ----------------------------------------------------------
     VALIDAÇÃO 1: Campos vazios
     Garante que o usuário não envie o formulário em branco.
  ---------------------------------------------------------- */
  if (usuario === "" || senha === "") {
    exibirErro("erro-login", "⚠️ Por favor, preencha o usuário e a senha.");
    return; /* Interrompe a função aqui; não prossegue. */
  }

  /* ----------------------------------------------------------
     VALIDAÇÃO 2: Credenciais fixas
     Checagem simples por string literal.
     Em um sistema real, isso seria feito no servidor.
  ---------------------------------------------------------- */
  if (usuario !== "admin" || senha !== "1234") {
    exibirErro("erro-login", "❌ Usuário ou senha incorretos.");
    return; /* Interrompe a função; não autentica. */
  }

  /* --- Autenticação bem-sucedida --- */
  usuarioLogado = true;

  /* Oculta a tela de login e exibe o dashboard */
  alternarTelas("tela-login", "tela-dashboard");

  /* Limpa os campos de login por segurança */
  document.getElementById("input-usuario").value = "";
  document.getElementById("input-senha").value   = "";

  /* Garante que o erro some (caso estivesse visível) */
  ocultarErro("erro-login");

  /* Renderiza a lista de times no dashboard */
  renderizarLista();
}


/*
 * realizarLogout()
 * Chamada pelo onclick do botão "Sair" na navbar do dashboard.
 *
 * Fluxo:
 *   - Reseta o estado de sessão.
 *   - Reseta o formulário (cancela qualquer edição em andamento).
 *   - Volta para a tela de login.
 *
 * NOTA: Por design acadêmico, o array de times NÃO é limpo
 * no logout. Se quisesse limpar, bastaria: listaDeTimes = [];
 */
function realizarLogout() {
  /* Reseta o estado de autenticação */
  usuarioLogado = false;

  /* Cancela qualquer edição que estivesse em andamento */
  cancelarEdicao();

  /* Limpa o campo de nome do time */
  document.getElementById("input-time").value = "";

  /* Limpa erros do formulário, se houver */
  ocultarErro("erro-formulario");

  /* Alterna de volta para a tela de login */
  alternarTelas("tela-dashboard", "tela-login");
}


/* ================================================================
   BLOCO C — FUNÇÕES DE CRUD
================================================================ */

/*
 * salvarTime()
 * Chamada pelo onclick do botão "Salvar".
 * Age como "Adicionar" ou "Confirmar Edição" dependendo
 * do valor de indiceEmEdicao.
 *
 * VALIDAÇÃO APLICADA:
 *   - Campo vazio → exibe erro e interrompe. Nenhuma alteração
 *     é feita no array, nem mesmo na edição (item original intacto).
 */
function salvarTime() {
  /* Captura e limpa espaços das bordas do valor digitado */
  var nomeDoTime = document.getElementById("input-time").value.trim();

  /* ----------------------------------------------------------
     VALIDAÇÃO: Campo de texto vazio
     Impede salvar um time sem nome.
     Em modo de edição, o item original do array permanece
     intacto porque saímos da função antes de tocar no array.
  ---------------------------------------------------------- */
  if (nomeDoTime === "") {
    exibirErro("erro-formulario", "⚠️ O nome do time não pode estar vazio.");
    return; /* Interrompe aqui. Array não é modificado. */
  }

  /* Esconde erros anteriores, pois a validação passou */
  ocultarErro("erro-formulario");

  /* ----------------------------------------------------------
     DECISÃO: Adicionar novo ou Confirmar edição?
     indiceEmEdicao === -1  →  modo de adição
     indiceEmEdicao >= 0    →  modo de edição
  ---------------------------------------------------------- */
  if (indiceEmEdicao === -1) {
    /* --- MODO ADIÇÃO: empurra nova string ao final do array --- */
    listaDeTimes.push(nomeDoTime);
  } else {
    /* --- MODO EDIÇÃO: substitui a string na posição correta --- */
    listaDeTimes[indiceEmEdicao] = nomeDoTime;

    /* Volta ao modo de adição e oculta o botão Cancelar */
    indiceEmEdicao = -1;
    atualizarModoFormulario(false);
  }

  /* Limpa o campo de texto após salvar */
  document.getElementById("input-time").value = "";

  /* Re-renderiza a lista com os dados atualizados */
  renderizarLista();
}


/*
 * editarTime(indice)
 * Chamada pelos botões "Editar" gerados dinamicamente na lista.
 * Recebe o ÍNDICE do item no array como parâmetro.
 *
 * FLUXO:
 *   - Copia o valor do array[indice] para o campo de texto.
 *   - Registra qual índice está sendo editado.
 *   - Alterna o formulário para "modo edição" (exibe Cancelar).
 *
 * @param {number} indice - posição do time no array listaDeTimes
 */
function editarTime(indice) {
  /* Busca o nome atual do time pelo índice e coloca no input */
  document.getElementById("input-time").value = listaDeTimes[indice];

  /* Registra globalmente qual índice está em edição */
  indiceEmEdicao = indice;

  /* Muda o visual do formulário para o modo de edição */
  atualizarModoFormulario(true);

  /* Dá foco ao campo para facilitar a digitação */
  document.getElementById("input-time").focus();

  /* Limpa erros anteriores */
  ocultarErro("erro-formulario");
}


/*
 * removerTime(indice)
 * Chamada pelos botões "Remover" gerados dinamicamente na lista.
 * Recebe o ÍNDICE do item no array como parâmetro.
 *
 * RESTRIÇÃO CUMPRIDA:
 *   A remoção usa splice(indice, 1), que opera EXCLUSIVAMENTE
 *   pela posição no array. Nunca pelo valor/nome do time.
 *   Isso garante que, se houver dois times "Santos FC",
 *   apenas o clicado seja removido.
 *
 * @param {number} indice - posição do time no array listaDeTimes
 */
function removerTime(indice) {
  /*
   * Se um item diferente do que está sendo editado for removido,
   * cancela a edição para evitar inconsistências de índice.
   */
  if (indiceEmEdicao !== -1 && indiceEmEdicao !== indice) {
    cancelarEdicao();
  }

  /*
   * splice(indice, 1):
   *   - Primeiro argumento: onde começar (o índice clicado).
   *   - Segundo argumento: quantos remover (1 item).
   * Nunca usa .filter() ou .indexOf() por nome.
   */
  listaDeTimes.splice(indice, 1);

  /* Se o item em edição foi removido, reseta o modo */
  if (indiceEmEdicao === indice) {
    cancelarEdicao();
  }

  /* Re-renderiza a lista atualizada */
  renderizarLista();
}


/*
 * cancelarEdicao()
 * Chamada pelo onclick do botão "Cancelar" (visível no modo de edição).
 * Também chamada internamente por outras funções.
 *
 * GARANTIA: O item original no array NÃO é alterado em nenhum
 * momento desta função. Apenas a UI é resetada.
 */
function cancelarEdicao() {
  /* Volta o índice para -1 (modo de adição) */
  indiceEmEdicao = -1;

  /* Limpa o campo de texto sem salvar nada */
  document.getElementById("input-time").value = "";

  /* Volta o formulário para o modo de adição */
  atualizarModoFormulario(false);

  /* Remove erros do formulário */
  ocultarErro("erro-formulario");
}


/* ================================================================
   BLOCO D — FUNÇÕES DE RENDERIZAÇÃO E UI
================================================================ */

/*
 * renderizarLista()
 * Responsável por desenhar (ou redesenhar) toda a lista de times
 * no DOM com base no estado atual do array listaDeTimes.
 *
 * Estratégia: limpa o innerHTML da <ul> e reconstrói do zero.
 * Simples e didático para um projeto acadêmico.
 */
function renderizarLista() {
  var ul = document.getElementById("lista-times");
  var msgVazia = document.getElementById("msg-lista-vazia");
  var contador = document.getElementById("contador-times");

  /* Atualiza o badge com o total atual */
  var total = listaDeTimes.length;
  if (total === 1) {
    contador.textContent = "1 time";
  } else {
    contador.textContent = total + " times";
  }

  /* Se não há times cadastrados, exibe a mensagem vazia e para */
  if (total === 0) {
    ul.innerHTML = "";
    msgVazia.classList.remove("oculto");
    return;
  }

  /* Há times: oculta a mensagem vazia */
  msgVazia.classList.add("oculto");

  /*
   * Reconstrói a lista.
   * Usamos innerHTML para simplicidade didática.
   * Cada <li> recebe botões com onclick passando o índice.
   *
   * IMPORTANTE: Os botões chamam removerTime(i) e editarTime(i),
   * passando o índice numérico — não o nome do time.
   */
  var html = "";

  for (var i = 0; i < listaDeTimes.length; i++) {
    html += '<li>';

    /* Informações do time: número + nome */
    html += '  <div class="item-info">';
    html += '    <span class="item-numero">' + (i + 1) + 'º</span>';
    html += '    <span class="item-nome">' + escaparHTML(listaDeTimes[i]) + '</span>';
    html += '  </div>';

    /* Botões de ação: Editar e Remover com o ÍNDICE i */
    html += '  <div class="item-acoes">';
    html += '    <button class="btn btn-editar" onclick="editarTime(' + i + ')">✏️ Editar</button>';
    html += '    <button class="btn btn-perigo" onclick="removerTime(' + i + ')">🗑 Remover</button>';
    html += '  </div>';

    html += '</li>';
  }

  ul.innerHTML = html;
}


/*
 * atualizarModoFormulario(modoEdicao)
 * Atualiza os textos e elementos visíveis do formulário
 * conforme o modo atual (adição ou edição).
 *
 * @param {boolean} modoEdicao - true = modo edição, false = modo adição
 */
function atualizarModoFormulario(modoEdicao) {
  var titulo    = document.getElementById("titulo-formulario");
  var btnCancelar = document.getElementById("btn-cancelar");

  if (modoEdicao) {
    titulo.textContent = "Editar Time";
    btnCancelar.classList.remove("oculto"); /* Exibe o botão Cancelar */
  } else {
    titulo.textContent = "Adicionar Time";
    btnCancelar.classList.add("oculto");    /* Oculta o botão Cancelar */
  }
}


/*
 * alternarTelas(idParaOcultar, idParaExibir)
 * Gerencia a troca entre a tela de login e o dashboard.
 * Usa a classe utilitária .oculto definida no CSS.
 *
 * @param {string} idParaOcultar - id do elemento a ocultar
 * @param {string} idParaExibir  - id do elemento a exibir
 */
function alternarTelas(idParaOcultar, idParaExibir) {
  document.getElementById(idParaOcultar).classList.add("oculto");
  document.getElementById(idParaExibir).classList.remove("oculto");
}


/*
 * exibirErro(idElemento, mensagem)
 * Exibe uma mensagem de erro em um elemento específico da tela.
 * Remove a classe .oculto e define o texto da mensagem.
 *
 * @param {string} idElemento - id do parágrafo de erro no HTML
 * @param {string} mensagem   - texto a exibir
 */
function exibirErro(idElemento, mensagem) {
  var el = document.getElementById(idElemento);
  el.textContent = mensagem;
  el.classList.remove("oculto");

  /*
   * Truque CSS: remove e reaplica a classe de animação
   * para que o efeito de "sacudir" rode novamente
   * mesmo que o erro já estivesse visível.
   */
  el.style.animation = "none";
  el.offsetHeight;                    /* Força o reflow do browser */
  el.style.animation = "";
}


/*
 * ocultarErro(idElemento)
 * Oculta um elemento de erro adicionando a classe .oculto.
 *
 * @param {string} idElemento - id do parágrafo de erro no HTML
 */
function ocultarErro(idElemento) {
  var el = document.getElementById(idElemento);
  el.classList.add("oculto");
  el.textContent = "";
}


/*
 * escaparHTML(texto)
 * Função de segurança: converte caracteres especiais do HTML
 * em entidades seguras para evitar injeção de HTML (XSS básico).
 * Ex: "<script>" vira "&lt;script&gt;" e não é executado.
 *
 * @param  {string} texto - string a ser escapada
 * @return {string}       - string com caracteres perigosos substituídos
 */
function escaparHTML(texto) {
  var div = document.createElement("div");
  div.appendChild(document.createTextNode(texto));
  return div.innerHTML;
}


/* ================================================================
   BLOCO E — INICIALIZAÇÃO
   Única chamada no escopo global além das declarações de variáveis.
   Garante que a UI esteja no estado correto ao carregar a página.
================================================================ */

/*
 * Renderiza a lista ao iniciar (no caso de pre-popular o array
 * para testes — ex: listaDeTimes = ["Santos", "Flamengo"]).
 * Em produção, inicia com array vazio, então esta chamada é
 * principalmente garantia de consistência.
 */
renderizarLista();