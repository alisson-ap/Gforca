const url = 'http://localhost:3000/nivel'

const btnFacil = document.getElementById('btnFacil')
const btnMedio = document.getElementById('btnMedio')
const btnDificil = document.getElementById('btnDificil')

let palavra
let tema
let dicas


const btnVoltar = document.getElementById('btnVoltar')


function voltar() {
  window.location.href = "index.html";
}

btnFacil.addEventListener('click', () => {
  getRandomWordWithTips()
  palavra = dWord
  tema = dTheme
  dicas = dHint

  console.log(palavra, tema, dicas);

  const url = "match.html?nivel=" + 1;

  window.location.href = url;

})

btnMedio.addEventListener('click', () => {

  const url = "versus.html?nivel=" + 2;

  window.location.href = url;
})

btnDificil.addEventListener('click', () => {

  const url = "versus.html?nivel=" + 3;

  window.location.href = url;

})