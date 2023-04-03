firebase.auth().onAuthStateChanged((user) => {
    if(user){
        showLoading()
        window.location.replace('index.html');
    }else{
        showLoading()
        console.log("Não está logado");
        hideLoading()
    }

  });

const email = document.getElementById('email')
const password = document.getElementById('password')


function login() {
    showLoading()
  firebase.auth().signInWithEmailAndPassword(
    email.value, password.value
    ).then(response => {
        hideLoading()
        window.location.href = "index.html";

  }).catch(error => {
    hideLoading()
    alert("Email ou senha incorreto!")
        console.log('deu errado', error)
  });    
}

function recuperarSenha(){
    showLoading()
    firebase.auth().sendPasswordResetEmail(email.value).then(()=>{
      hideLoading()
      alert("Email enviado com sucesso")  
    }).catch(error =>{
        hideLoading()
        alert("Email ou senha invalido!")
    })
}




