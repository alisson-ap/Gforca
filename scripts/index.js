const buttonCrud = document.getElementById('crud')


firebase.auth().onAuthStateChanged((user) => {
    if(user){
        if(user.email == "teste@gmail.com"){
            buttonCrud.classList.toggle("hide")
        }
        console.log(user.email)
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


