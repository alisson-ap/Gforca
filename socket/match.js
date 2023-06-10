var socket = io.connect("http://localhost:3000");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const nivel = params.get('nivel');

firebase.auth().onAuthStateChanged(user => {

    const userId = user.uid;
    const player = { userId, nivel }

    socket.emit('create-room', (player));

});

socket.on('player1', (playerUser) => {
    console.log("Player 1:" + playerUser);
    createButton(true);
});

socket.on('player2', (playerUser) => {
    console.log("Player 2:" + playerUser);
    createButton(false);
});

socket.on('redirect', (mensagem)=>{
    console.log(mensagem);
    showLoading()
    setTimeout(() => {
        window.location.href = "versus.html";
    }, 3000);
})

socket.on('checkReady', (player) => {

    console.log(player);
    if (player.player) {
        checkbox1.removeAttribute('disabled');
        checkbox1.click();
        checkbox1.setAttribute('disabled', 'disabled');
        // verificarMarcacao();

    } else {
        checkbox2.removeAttribute('disabled');
        checkbox2.click();
        checkbox2.setAttribute('disabled', 'disabled');
        // verificarMarcacao();
    }

});

function createButton(player) {

    const btnReady1 = document.getElementById("button1");
    const btnReady2 = document.getElementById("button2");

    const btnPronto1 = document.createElement("button");
    btnPronto1.setAttribute("id", "btnPronto1");
    btnPronto1.innerText = 'Pronto';
    btnPronto1.setAttribute("onClick", "checkBoxPlayer1()")

    const btnPronto2 = document.createElement("button");
    btnPronto2.setAttribute("id", "btnPronto2");
    btnPronto2.innerText = 'Pronto';
    btnPronto2.setAttribute("onClick", "checkBoxPlayer2()");

    if (player) {
        btnPronto1.disabled = false;
        btnPronto2.disabled = true;
    } else {
        btnPronto1.disabled = true;
        btnPronto2.disabled = false;
    }

    btnReady1.appendChild(btnPronto1);
    // btnReady1.appendChild(div1);

    btnReady2.appendChild(btnPronto2);
    // btnReady2.appendChild(div2);
}

function checkBoxPlayer1() {
    checkbox1.removeAttribute('disabled');
    checkbox1.click();
    checkbox1.setAttribute('disabled', 'disabled');

    const data = {
        socketId: socket.id,
        player: true,
    }

    socket.emit('ready', (data));
};

function checkBoxPlayer2() {
    checkbox2.removeAttribute('disabled');
    checkbox2.click();
    checkbox2.setAttribute('disabled', 'disabled');

    const data = {
        socketId: socket.id,
        player: false,
    }

    socket.emit('ready', (data));

};

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

document.addEventListener('DOMContentLoaded', () => {

});

function setPronto() {

    // console.log(user);

    // socket.emit('ready', (user));
}

// setPronto();
// socket.on('checkReady',(user))

// console.log(user);

