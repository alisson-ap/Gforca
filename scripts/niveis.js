const btnFacil = document.getElementById('btnFacil')
const btnMedio = document.getElementById('btnMedio')
const btnDificil = document.getElementById('btnDificil')


const btnVoltar = document.getElementById('btnVoltar')


function voltar(){
    window.location.href = "index.html";
}

btnFacil.addEventListener('click' , ()=>{
    window.location.href = "match.html";
  })

  btnMedio.addEventListener('click' , ()=>{
    window.location.href = "match.html";
  })

  btnDificil.addEventListener('click' , ()=>{
    window.location.href = "match.html";
  })