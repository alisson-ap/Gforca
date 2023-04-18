function showLoading(){
    console.log("loading")
    const div = document.createElement("div")
    div.classList.add("loading")

    const divAnimation = document.createElement("div")
    divAnimation.classList.add("loader")

    div.appendChild(divAnimation)

    document.body.appendChild(div)
}


function hideLoading(){
    const loading = document.getElementsByClassName("loading")
    if(loading.length){
        loading[0].remove()
        console.log("fechando o loading")
    }
}