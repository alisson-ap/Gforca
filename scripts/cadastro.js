firebase.auth().onAuthStateChanged(user => {
    if(user){
        showLoading();
        setTimeout(() => {
            window.location.href = "index.html";
            hideLoading();
        }, 3000);
    }
})



const nameUser = document.getElementById('nome');
const email = document.getElementById('email');
const password = document.getElementById('senha');

const usersRef = firebase.firestore().collection("users");

function register() {
    showLoading();
  
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
        // Cria um novo documento na coleção "users" com o ID do usuário recém-criado
        usersRef.doc(userCredential.user.uid).set({
          name: nameUser.value,
          email: email.value,
          partidas: 0,
          money: 0,
          partidasPerdidas:0,
          partidasGanhas:0
        })
        .then(() => {
            //hideLoading();
            window.location.href = "index.html";
            // espera 2 segundos antes de redirecionar para index.html
          })
        .catch((error) => {
          console.error("Erro ao criar documento do usuário: ", error);
          hideLoading();
          alert("Erro ao criar documento do usuário");
        });
      })
      .catch((error) => {
        hideLoading();
        if (error.code == "auth/email-already-in-use") {
          alert("E-mail já cadastrado");
        } else {
          alert("Dados incorretos");
        }
      });
  }


