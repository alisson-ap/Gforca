firebase.auth().onAuthStateChanged((user) => {
    if(user){
        //showLoading()
        window.location.replace('index.html');
    }else{
       // showLoading()
        console.log("Não está logado");
        //hideLoading()
    }
  });

const email = document.getElementById('email')
const password = document.getElementById('password')
const btnLogin = document.getElementById('btnLogin')


btnLogin.addEventListener("click", () => {
  console.log(email.value, password.value)
  if(!email.value || !password.value){
    alert("Preencha os campos")
    return
  }

  showLoading()
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(response => {
      hideLoading()
      window.location.href = "index.html";
    })
    .catch(error => {
      hideLoading()
      console.log('deu errado', error);
      alert("Email ou senha incorreto!");
    });
});






