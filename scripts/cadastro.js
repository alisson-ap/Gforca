const name = document.getElementById('nome');
const email = document.getElementById('email');
const password = document.getElementById('senha');

firebase.auth().onAuthStateChanged(user => {
    if(user){
        window.location.href = "index.html";
    }
})


function register(){
    showLoading()
    firebase.auth().createUserWithEmailAndPassword(
        email.value, password.value
    ).then(() =>{
        hideLoading();
        window.location.href = "index.html";
    }).catch(error => {
        hideLoading()
        
        if (error.code == "auth/email-already-in-use"){
            alert("Email já cadastrado")
        }else{
            alert("Dados incorretos")
        }
    })
}