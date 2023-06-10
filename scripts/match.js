// const btnPronto1 = document.getElementById('btnPronto1');
// const btnPronto2 = document.getElementById('btnPronto2');

// const checkbox1 = document.getElementById('checkbox1');
// const checkbox2 = document.getElementById('checkbox2');



// btnPronto1.addEventListener('click', function() {
//     checkbox1.removeAttribute('disabled');
//     checkbox1.click();
//     checkbox1.setAttribute('disabled', 'disabled');
//     verificarMarcacao();
// });

// btnPronto2.addEventListener('click', function() {
//     checkbox2.removeAttribute('disabled');
//     checkbox2.click();
//     checkbox2.setAttribute('disabled', 'disabled');
//     verificarMarcacao();
// });





// const checkboxPlayer1 = document.getElementById("checkboxPlayer1")
// const checkboxPlayer2 = document.getElementById("checkboxPlayer2")

// const readyP1 = document.getElementById("readyP1")
// const readyP2 = document.getElementById("readyP2")


// function createCheckbox(player){

// }

// checkboxPlayer1.addEventListener('click', function() {
    
//     if (checkboxPlayer1.checked){
//         readyP1.innerHTML = "Pronto"
//     }else if (!checkboxPlayer1.disabled){
//         readyP1.innerHTML = "Aguardando..."
//     }
//     verificarMarcacao();
// });


// checkboxPlayer2.addEventListener('click', function() {
//     if (checkboxPlayer2.checked){
//         readyP2.innerHTML = "Pronto"
//     }else if (!checkboxPlayer2.disabled){
//         readyP2.innerHTML = "Aguardando..."
//     }
//     verificarMarcacao();
// });


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


function sair(){
    window.location.href = "index.html";
}