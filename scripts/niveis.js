const usersRef = firebase.firestore().collection("users");
const auth = firebase.auth();

const btnFacil = document.getElementById('btnFacil')
const btnMedio = document.getElementById('btnMedio')
const btnDificil = document.getElementById('btnDificil')

const moedasPefil = document.getElementById('moedasPefil')

let palavra
let tema
let dicas


const btnVoltar = document.getElementById('btnVoltar')

showLoading()
firebase.auth().onAuthStateChanged((user) => {
    const uid = user.uid;
    if(user){         
        usersRef.doc(uid).get()
        .then((doc) => {
          if (doc.exists) {
                     
            const data = doc.data();
            const moedas = data.money;
            
            moedasPefil.innerHTML = moedas
            hideLoading()
            
          } else {
            console.log("Documento do usuário não encontrado.");
            hideLoading()
          }
        })
        .catch((error) => {
          console.log("Erro ao recuperar informações do usuário: ", error);
        });
    }

  });

















btnFacil.addEventListener('click' , ()=>{
  // getRandomWordWithTips()
  //   palavra = dWord
  //   tema = dTheme
  //   dicas = dHint

  //   console.log(palavra , tema , dicas)
    const url = "match.html?nivel=" + 1;
    window.location.href = url;
  })

  btnMedio.addEventListener('click' , ()=>{

    const url = "match.html?nivel=" + 2;
    window.location.href = url;
  })

  btnDificil.addEventListener('click' , ()=>{

    const url = "match.html?nivel=" + 3;
    window.location.href = url;
  })