const usersRef = firebase.firestore().collection("users");
const auth = firebase.auth();


const moedasPefil = document.getElementById('perfilMoedas')
const perfilNome = document.getElementById('perfilNome')


showLoading()
firebase.auth().onAuthStateChanged((user) => {
  const uid = user.uid;
  if (user) {
    usersRef.doc(uid).get()
      .then((doc) => {
        if (doc.exists) {

          const data = doc.data();
          const moedas = data.money;
          const nome = data.name

          const userId = user.uid;
          const player = { userId, nivel, nome}

          socket.emit('create-room', (player));

          socket.emit('name',(nome));

          // perfilNome.innerHTML = nome
          moedasPefil.innerHTML = moedas
          hideLoading()
          //console.log(premio,valorAposta,nivel)
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

function verificarMarcacao() {
  if (checkboxPlayer1.checked && checkboxPlayer2.checked) {
    checkboxPlayer1.disabled = true;
    checkboxPlayer2.disabled = true;
    console.log("marcou os dois check");
    showLoading()
    setTimeout(() => {
      window.location.href = "versus.html";
    }, 3000);
  }
}


