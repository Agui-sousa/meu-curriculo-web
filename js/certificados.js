
/**
 * SG.DEV — Portfólio Profissional
 * Arquivo: js/certificados.js
 * Gerenciamento da biblioteca de certificados
 */

"use strict";

// 01. CADASTRO DOS CERTIFICADOS
// Os certificados reais serão adicionados aqui.


const certificados = [
  {
    titulo: "Crie um site simples usando HTML, CSS e JavaScript",
    categoria: "Desenvolvimento Web",
    instituicao: "\fundação Bradesco",
    ano: "2025",
    arquivo: "assets/certificados/" + encodeURIComponent(
      "Crie um site simples usando HTML, CSS e JavaScript.pdf"
    )
  },
  {
    titulo: "Fundamentos de TI - Hardware e Software",
    categoria: "Fundamentos de TI",
    instituicao: "fundação Bradesco",
    ano: "2023",
    arquivo: "assets/certificados/" + encodeURIComponent(
      "FUNDAMENTOS DE TI HARDWARE E SOFTWARE.pdf"
    )
  },
  {
    titulo: "Linguagem de Programação C# - Avançado",
    categoria: "Programação",
    instituicao: "fundação Bradesco",
    ano: "2023",
    arquivo: "assets/certificados/" + encodeURIComponent(
      "Linguagem de Programação C# - Avançado.pdf"
    )
  },
  {
    titulo: "Linguagem de Programação C# - Básico",
    categoria: "Programação",
    instituicao: "fundação Bradesco",
    ano: "2023",
    arquivo: "assets/certificados/" + encodeURIComponent(
      "Linguagem de Programação C# - Básico.pdf"
    )
  },
  {
    titulo: "Segurança em Tecnologia da Informação",
    categoria: "Segurança da Informação",
    instituicao: "fundação Bradesco",
    ano: "2026",
    arquivo: "assets/certificados/" + encodeURIComponent(
      "Segurança em Tecnologia da Informação.pdf"
    )
 
  },
  {
    titulo: "Certificação em Redes",
    categoria: "Redes de Computadores",
    instituicao: "BluePex",
    ano: "2026",
    arquivo: "assets/certificados/" + encodeURIComponent(
      "Certificação em Redes.pdf"
    )
  }
];


// 02. ELEMENTOS DA INTERFACE

const gradeCertificados = document.getElementById(
  "certificates-grid"
);

const campoPesquisa = document.getElementById(
  "certificate-search"
);

const filtroCategoria = document.getElementById(
  "certificate-filter"
);

const mensagemVazia = document.getElementById(
  "certificates-empty"
);

// 03. NORMALIZAÇÃO DA PESQUISA

function normalizarTexto(texto) {
  return String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

// 04. CARREGAMENTO DAS CATEGORIAS

function carregarCategorias() {
  if (!filtroCategoria) return;

  const categorias = [
    ...new Set(certificados.map(item => item.categoria))
  ];

  categorias
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .forEach(categoria => {
      const opcao = document.createElement("option");

      opcao.value = categoria;
      opcao.textContent = categoria;

      filtroCategoria.appendChild(opcao);
    });
}

// 05. CRIAÇÃO DO CARTÃO

function criarCartao(certificado) {
  const cartao = document.createElement("article");
  cartao.className = "certificate-card";

  const categoria = document.createElement("span");
  categoria.className = "project-category";
  categoria.textContent = certificado.categoria;

  const titulo = document.createElement("h3");
  titulo.textContent = certificado.titulo;

  const instituicao = document.createElement("p");
  instituicao.textContent = certificado.instituicao;

  const ano = document.createElement("p");
  ano.textContent = `Ano: ${certificado.ano}`;

  cartao.append(
    categoria,
    titulo,
    instituicao,
    ano
  );

  // O botão é exibido somente quando existe um PDF.
  if (certificado.arquivo) {
    const visualizar = document.createElement("a");

    visualizar.href = certificado.arquivo;
    visualizar.target = "_blank";
    visualizar.rel = "noopener noreferrer";
    visualizar.textContent = "Visualizar certificado ↗";

    cartao.appendChild(visualizar);
  }

  return cartao;
}

// 06. PESQUISA E FILTROS

function filtrarCertificados() {
  if (
    !gradeCertificados ||
    !campoPesquisa ||
    !filtroCategoria ||
    !mensagemVazia
  ) {
    return;
  }

  const pesquisa = normalizarTexto(campoPesquisa.value);
  const categoriaSelecionada = filtroCategoria.value;

  const resultados = certificados.filter(certificado => {
    const texto = normalizarTexto(
      `${certificado.titulo} ${certificado.instituicao} ${certificado.categoria}`
    );

    const correspondePesquisa = texto.includes(pesquisa);

    const correspondeCategoria =
      categoriaSelecionada === "todos" ||
      certificado.categoria === categoriaSelecionada;

    return correspondePesquisa && correspondeCategoria;
  });

  renderizarCertificados(resultados);
}

// 07. EXIBIÇÃO DOS CERTIFICADOS

function renderizarCertificados(lista) {
  if (!gradeCertificados || !mensagemVazia) return;

  gradeCertificados.replaceChildren();

  if (lista.length === 0) {
    mensagemVazia.hidden = false;

    mensagemVazia.textContent = certificados.length === 0
      ? "Os certificados serão adicionados aqui."
      : "Nenhum certificado encontrado para esta pesquisa.";

    return;
  }

  mensagemVazia.hidden = true;

  const fragmento = document.createDocumentFragment();

  lista.forEach(certificado => {
    fragmento.appendChild(criarCartao(certificado));
  });

  gradeCertificados.appendChild(fragmento);
}

// 08. INICIALIZAÇÃO

function iniciarBiblioteca() {
  if (
    !gradeCertificados ||
    !campoPesquisa ||
    !filtroCategoria ||
    !mensagemVazia
  ) {
    return;
  }

  carregarCategorias();
  renderizarCertificados(certificados);

  campoPesquisa.addEventListener(
    "input",
    filtrarCertificados
  );

  filtroCategoria.addEventListener(
    "change",
    filtrarCertificados
  );
}

iniciarBiblioteca();
