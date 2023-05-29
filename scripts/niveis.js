const btnFacil = document.getElementById('btnFacil')
const btnMedio = document.getElementById('btnMedio')
const btnDificil = document.getElementById('btnDificil')

let palavra
let tema
let dicas


const btnVoltar = document.getElementById('btnVoltar')


function voltar(){
    window.location.href = "index.html";
}

btnFacil.addEventListener('click' , ()=>{
  getRandomWordWithTips()
    palavra = dWord
    tema = dTheme
    dicas = dHint

    console.log(palavra , tema , dicas)

    window.location.href = "match.html";
  })

  btnMedio.addEventListener('click' , ()=>{


    window.location.href = "versus.html";
  })

  btnDificil.addEventListener('click' , ()=>{



    window.location.href = "versus.html";
  })