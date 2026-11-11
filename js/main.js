
/**
 * SG.DEV — Portfólio Profissional
 * Arquivo: js/main.js
 * Funcionalidades gerais do site
 */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  iniciarMenu();
  atualizarAno();
});

/**
 * Controla a navegação em dispositivos móveis.
 */
function iniciarMenu() {
  const botaoMenu = document.getElementById("menu-toggle");
  const listaMenu = document.getElementById("nav-links");

  if (!botaoMenu || !listaMenu) {
    return;
  }

  function fecharMenu() {
    listaMenu.classList.remove("is-open");

    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }

  function alternarMenu() {
    const aberto = listaMenu.classList.toggle("is-open");

    botaoMenu.setAttribute(
      "aria-expanded",
      String(aberto)
    );

    botaoMenu.setAttribute(
      "aria-label",
      aberto ? "Fechar menu" : "Abrir menu"
    );
  }

  // Abre ou fecha o menu.
  botaoMenu.addEventListener("click", alternarMenu);

  // Fecha o menu após selecionar uma seção.
  listaMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  // Permite fechar o menu pressionando ESC.
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      fecharMenu();
    }
  });

  // Fecha o menu ao clicar fora da navegação.
  document.addEventListener("click", (evento) => {
    const clicouNoMenu = listaMenu.contains(evento.target);
    const clicouNoBotao = botaoMenu.contains(evento.target);

    if (!clicouNoMenu && !clicouNoBotao) {
      fecharMenu();
    }
  });

  // Remove o estado aberto ao retornar para desktop.
  const telaDesktop = window.matchMedia("(min-width: 769px)");

  telaDesktop.addEventListener("change", (evento) => {
    if (evento.matches) {
      fecharMenu();
    }
  });
}

/**
 * Mantém o ano do rodapé atualizado.
 */
function atualizarAno() {
  const elementoAno = document.getElementById("current-year");

  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }
}
