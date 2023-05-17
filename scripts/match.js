const btnPronto1 = document.getElementById('btnPronto1');
const btnPronto2 = document.getElementById('btnPronto2');

const checkbox1 = document.getElementById('checkbox1');
const checkbox2 = document.getElementById('checkbox2');



btnPronto1.addEventListener('click', function() {
    checkbox1.removeAttribute('disabled');
    checkbox1.click();
    checkbox1.setAttribute('disabled', 'disabled');
    verificarMarcacao();
});

btnPronto2.addEventListener('click', function() {
    checkbox2.removeAttribute('disabled');
    checkbox2.click();
    checkbox2.setAttribute('disabled', 'disabled');
    verificarMarcacao();
});


function verificarMarcacao() {
    if (checkbox1.checked && checkbox2.checked) {
        btnPronto1.disabled = true;
        btnPronto2.disabled = true;
        console.log("marcou os dois check");
        showLoading()
        setTimeout(() => {
            window.location.href = "versus.html";
        }, 3000);
    }
}