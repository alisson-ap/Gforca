firebase.auth().onAuthStateChanged(user => {
    if(!user){
        showLoading()
        setTimeout(()=>{
            window.location.href = "login.html";
        }, 500);
    }
})