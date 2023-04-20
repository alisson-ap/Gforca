const buttonCrud = document.getElementById('crud')
const buttonGame = document.getElementById('buttonGame')
const usersRef = firebase.firestore().collection("users");
const themeRef = firebase.firestore().collection("theme");

const coins = document.getElementById('coins')
const btnMoedas = document.getElementById('btnMoedas')
const emailPerfil = document.getElementById('emailPerfil')
const nomePerfil = document.getElementById('nomePerfil')
const moedasPerfil = document.getElementById('moedasPerfil')

// showLoading()
// setTimeout(()=>{
//   hideLoading()
// }, 3000);

buttonCrud.addEventListener('click' , ()=>{
  window.location.href = "crud.html";
})

firebase.auth().onAuthStateChanged((user) => {
    if(user){
        if(user.email == "admin@gmail.com"){
          
            buttonCrud.classList.toggle("hide")
            
        }else{
          buttonGame.classList.toggle("hide")
          coins.classList.toggle("hide")
        }
            
        usersRef.doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            // o documento do usuário existe, recupere as informações
            const data = doc.data();
            const nome = data.name;
            const email = data.email;
            const moedas = data.money;

            emailPerfil.innerHTML = email
            nomePerfil.innerHTML = nome
            moedasPerfil.innerHTML = moedas
            
            console.log(nome,email,moedas)
            // execute as ações para exibir as informações na tela
          } else {
            // o documento do usuário não existe
            console.log("Documento do usuário não encontrado.");
          }
        })
        .catch((error) => {
          console.log("Erro ao recuperar informações do usuário: ", error);
        });
    }

  });

  function logout(){
    firebase.auth().signOut().then(()=>{
        showLoading()
        window.location.href = "login.html";
    }).catch(() =>{
        alert("Erro ao fazer logout")
    })
}



