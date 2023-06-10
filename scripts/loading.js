//const body = document.querySelector('body');


function showLoading(){
    console.log("loading")
    const div = document.createElement("div")
    div.classList.add("loading")

    const divAnimation = document.createElement("div")
    divAnimation.classList.add("loader")

    div.appendChild(divAnimation)
    document.body.insertBefore(div, document.body.firstChild);
}


function hideLoading() {
    const loading = document.querySelector('.loading');
    document.body.removeChild(loading);
  }