var socket = io.connect("http://localhost:3000");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const nivel = params.get('nivel');

const dificuldade = document.getElementById('difilcudade')
const valorPartida = document.getElementById('valorPartida')

if(nivel == 1){
    dificuldade.innerText = "Fácil"
    valorPartida.innerText = "100"

}else if(nivel == 2){
    dificuldade.innerText = "Médio"
    valorPartida.innerText = "250"

}else{
    dificuldade.innerText = "Difícil"
    valorPartida.innerText = "500"
}

firebase.auth().onAuthStateChanged(user => {

    const userId = user.uid;
    const player = { userId, nivel }

    // socket.emit('create-room', (player));

});

socket.on('player1', (playerUser) => {
    console.log("Player 1:" + playerUser);
    createCheckbox(true);
});

socket.on('player2', (playerUser) => {
    console.log("Player 2:" + playerUser);
    createCheckbox(false);
});

socket.on('redirect', (room) => {
    words(room);
    showLoading();
    setTimeout(() => {
        window.location.href = "versus.html?room=" + room +"&nivel="+nivel;
    }, 3000);
})



socket.on('checkReady', (player) => {
    const checkBox1P = document.getElementById("checkboxPlayer1");
    const checkBox2P = document.getElementById("checkboxPlayer2");

    if (player.player) {
        checkBox1P.removeAttribute('disabled');
        checkBox1P.setAttribute('disabled', 'disabled');

        if (checkBox1P.checked) {
            checkBox1P.checked = false;
            readyP1.innerHTML = "Aguardando";
        } else {
            checkBox1P.checked = true;
            readyP1.innerHTML = "Pronto";
        }

    } else {
        checkBox2P.removeAttribute('disabled');
        checkBox2P.setAttribute('disabled', 'disabled');

        if (checkBox2P.checked) {
            checkBox2P.checked = false;
            readyP2.innerHTML = "Aguardando";
        } else {
            checkBox2P.checked = true;
            readyP2.innerHTML = "Pronto";
        }
    }

});

const readyP1 = document.getElementById("readyP1")
const readyP2 = document.getElementById("readyP2")


function createCheckbox(player) {
    const check1 = document.getElementById('check1');
    const check2 = document.getElementById('check2');

    const checkBox1 = document.createElement("input");
    checkBox1.setAttribute("id", "checkboxPlayer1");
    checkBox1.setAttribute("type", "checkbox");
    checkBox1.setAttribute("onClick", "checkBoxPlayer1F()");

    const checkBox2 = document.createElement("input");
    checkBox2.setAttribute("id", "checkboxPlayer2");
    checkBox2.setAttribute("type", "checkbox");

    checkBox2.setAttribute("onClick", "checkBoxPlayer2F()");

    console.log(player);

    if (player) {
        checkBox1.disabled = false;
        checkBox2.disabled = true;
    } else {
        checkBox1.disabled = true;
        checkBox2.disabled = false;
    }

    check1.appendChild(checkBox1);
    check2.appendChild(checkBox2);

}

function checkBoxPlayer1F() {
    const data = {
        socketId: socket.id,
        player: true,
    }

    console.log("Aqui");
    socket.emit('ready', (data));
    const checkBox1 = document.getElementById("checkboxPlayer1");
    if (checkBox1.checked) {
        readyP1.innerHTML = "Pronto"
    } else {
        readyP1.innerHTML = "Aguardando"

    }
}

function checkBoxPlayer2F() {
    const data = {
        socketId: socket.id,
        player: false,
    }
    socket.emit('ready', (data));
    const checkBox2 = document.getElementById("checkboxPlayer2");
    if (checkBox2.checked) {
        readyP2.innerHTML = "Pronto"
    } else {
        readyP2.innerHTML = "Aguardando..."
    }
}

function words(roomId) {
    fetchWordsWithTips()
        .then(() => {

            const nivelDesejado = parseInt(nivel);

            const palavrasNivelDesejado = wordsWithTips.filter(word => word.nivel === nivelDesejado);
            // console.log(palavrasNivelDesejado)

            const randomWord = palavrasNivelDesejado[Math.floor(Math.random() * palavrasNivelDesejado.length)];

            const dWord = randomWord.word.toUpperCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u0366\u0368-\u036F]/g, '');

            const dTheme = randomWord.theme.toUpperCase();
            const dTips = randomWord.tips[0].nameTips;

            const data = {
                randomWord: randomWord,
                roomId: roomId
            }

            socket.emit("words", (data));

        });

}

function sair() {
    window.location.href = "index.html";
}