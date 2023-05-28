const recuperarEmail = document.getElementById('recuperarEmail')

function recuperarSenha(){
    console.log(recuperarEmail.value)
    showLoading()
    firebase.auth().sendPasswordResetEmail(recuperarEmail.value).then(()=>{
      hideLoading()
      alert("Email enviado com sucesso")
    }).catch(error =>{
        hideLoading()
        alert("Email invalido!")
    })
}