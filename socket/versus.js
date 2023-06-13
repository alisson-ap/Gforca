var socket = io.connect("https://gforca.onrender.com");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const room = params.get('room');

socket.emit("takeRoom", (room));

socket.on("decrement", (player) => {
    if (player) {
        keyboardEnable();
        facilitador5.disabled = false;

        bodyPartsP1++;
        drawBodyPart(bodyPartsP1, player);
        roundPlayer.innerHTML = "Player 2 jogando..."

        attemptsPlayer1.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP1);

    } else {
        keyboardEnable();
        facilitador5.disabled = false;

        console.log("Opa tela do player 1");
        bodyPartsP2++;
        drawBodyPart(bodyPartsP2, player);
        roundPlayer.innerHTML = "Player 1 jogando..."
        attemptsPlayer2.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP2);

    }
});

socket.on("correct", (player) => {
    if (player) {
        console.log("tela do player 2");
        console.log("na correct" + player)
        roundPlayer.innerHTML = "Player 2 jogando..."

        keyboardEnable();

        facilitador5.disabled = false;

    } else {
        console.log("tela do player 1");

        console.log("na correct" + player)
        roundPlayer.innerHTML = "Player 1 jogando..."

        keyboardEnable();
        facilitador5.disabled = false;

    }
});

socket.on("incrementLife", (player) => {
    if (player) {
        bodyPartsP1--;
        drawBodyPart(bodyPartsP1, player);
        attemptsPlayer1.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP1);

    } else {
        bodyPartsP2--;
        drawBodyPart(bodyPartsP2, player);
        attemptsPlayer2.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP2);

    }
});

socket.on("loser", (player) => {
    if (player) {
        showModalLoser();
    } else {
        showModalLoser();
    }
});

socket.on("winner", (player) => {
    if (player) {
        showModalWin();
    } else {
        showModalWin();
    }
})

async function takePartida() {
    const result = await fetch("https://gforca.onrender.com/partida/" + room);
    const partida = await result.json();
    return partida;
}


function setPlayer(id, partida) {

    if (partida.player1.id === id) {
        return {
            socketId: socket.id,
            player: true
        }
    } else if (partida.player2.id === id) {
        return {
            socketId: socket.id,
            player: false
        }
    }
}


// Verifica se a letra fornecida pelo jogador está correta
function checkLetter(letter, button, hiddenWord, wordLetters, player) {

    let foundLetter = false;

    // Verifica se a letra está presente na palavra
    for (let i = 0; i < wordLetters.length; i++) {
        if (wordLetters[i] === letter) {
            hiddenWord[i] = letter;
            foundLetter = true;
        }
    }

    // Atualiza o elemento da palavra oculta no HTML
    drawHiddenWord(hiddenWord);

    // Verifica se o jogador ganhou ou perdeu
    if (!hiddenWord.includes(" ")) {
        //alert("Parabéns! Você venceu!");]
        victory = {
            player: player,
            roomId: room
        }
        socket.emit("victory", (victory));
        showModalWin();
        verificarEAtualizarMoedas(premio)
        // stopTimer()

        //location.reload();
    } else if (!foundLetter) {
        // O jogador errou a letra, adiciona uma parte do corpo do boneco
        // startTimer(player)

        if (player) {
            bodyPartsP1++;
            attemptsPlayer1.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP1);
            playerWrong = {
                socketId: socket.id,
                player: player,
                roomId: room
            }
            socket.emit("attemptsP", (playerWrong));
            drawBodyPart(bodyPartsP1, player);

            if (bodyPartsP1 === maxBodyParts) {

                showModalLoser();
                defeat = {
                    player: player,
                    roomId: room
                }
                socket.emit("defeat", (defeat));
                //verificarEAtualizarMoedas(-100)

            } else {
                //alert("Letra incorreta. Tente novamente.");
                button.disabled = true;
                button.classList.add("disabled");
            }

        } else {
            bodyPartsP2++
            attemptsPlayer2.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP2);

            playerWrong = {
                socketId: socket.id,
                player: player,
                roomId: room
            }
            socket.emit("attemptsP", (playerWrong))
            drawBodyPart(bodyPartsP2, player);

            if (bodyPartsP2 === maxBodyParts) {

                showModalLoser();
                defeat = {
                    player: player,
                    roomId: room
                }
                socket.emit("defeat", (defeat));
                //verificarEAtualizarMoedas(-100)

            } else {
                //alert("Letra incorreta. Tente novamente.");
                button.disabled = true;
                button.classList.add("disabled");
            }
        }
    } else {
        // startTimer(player)
        button.disabled = true;
        button.classList.add("hit");

        console.log(player);
        console.log("no acerto")

        playerCorrect = {
            socketId: socket.id,
            player: player,
            roomId: room
        }
        socket.emit("right", (playerCorrect));
    }
}

firebase.auth().onAuthStateChanged(user => {

    const userId = user.uid;
    takePartida().then(partida => {
        const theme = partida.randomWord.theme.toUpperCase();
        const dTips = partida.randomWord.tips[0].nameTips;
        const dWord = partida.randomWord.word.toUpperCase().replace(/\s/g, '').normalize('NFD').replace(/[\u0300-\u0366\u0368-\u036F]/g, '');

        themeElement.textContent = "Tema: " + theme;
        hintElement.textContent = dTips;

        const wordLetters = dWord.split("");

        let hiddenWord = Array(wordLetters.length).fill(" ");

        drawHiddenWord(hiddenWord);

        const player = setPlayer(userId, partida);

        const keys = document.getElementsByClassName("key");
        for (let i = 0; i < keys.length; i++) {
            const button = keys[i];
            const letter = button.textContent;
            console.log(letter);
            button.addEventListener("click", function () {

                if (player.player) {
                    roundPlayer.innerHTML = "Player 2 jogando..."

                } else {
                    roundPlayer.innerHTML = "Player 1 jogando..."
                }

                checkLetter(letter, button, hiddenWord, wordLetters, player.player);

                keyboardDisable();
                facilitador5.disabled = true;
            });
        }

        if (player.player) {

            usersRef.doc(userId).get()
                .then((doc) => {
                    dPlayer1.innerHTML = "Player 1 - " + doc.data().name;
                    moedasPerfil.innerHTML = doc.data().money;
                });

            usersRef.doc(partida.player2.id).get()
                .then((doc) => {
                    dPlayer2.innerHTML = "Player 2 - " + doc.data().name;
                })

        } else {
            usersRef.doc(userId).get()
                .then((doc) => {
                    dPlayer2.innerHTML = "Player 2 - " + doc.data().name;
                    moedasPerfil.innerHTML = doc.data().money;
                    keyboardDisable();
                    facilitador5.disabled = true;
                });

            usersRef.doc(partida.player1.id).get()
                .then((doc) => {
                    dPlayer1.innerHTML = "Player 1 - " + doc.data().name;
                })
        }

        facilitador1.addEventListener("click", function () {
            const valorfacilitador1 = 15

            if (player.player) {

                console.log("player1: " + player.player);

                if (bodyPartsP1 === 0) {
                    showModalMsg("Você ainda não pode usar esse facilitador")
                    facilitador1.disabled = false

                } else if (moedasPerfil.textContent >= valorfacilitador1) {

                    verificarEAtualizarMoedas(-valorfacilitador1)

                    facilitador1.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #82c762)";
                    facilitador1.style.cursor = "not-allowed"
                    facilitador1.disabled = true

                    bodyPartsP1 = (bodyPartsP1 - 1)
                    drawBodyPart(bodyPartsP1, player.player);

                    increment = {
                        roomId: room,
                        player: player.player
                    }

                    socket.emit("increment", (increment));

                    attemptsPlayer1.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP1);
                } else {
                    showModalMsg("Você não tem moedas suficientes. Aqui")
                }
            } else {

                console.log("está aqui: " + player.player);
                if (bodyPartsP2 === 0) {
                    showModalMsg("Você ainda não pode usar esse facilitador")
                    facilitador1.disabled = false

                } else if (moedasPerfil.textContent >= valorfacilitador1) {

                    verificarEAtualizarMoedas(-valorfacilitador1)

                    facilitador1.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #82c762)";
                    facilitador1.style.cursor = "not-allowed"
                    facilitador1.disabled = true

                    bodyPartsP2 = (bodyPartsP2 - 1)
                    drawBodyPart(bodyPartsP2, player.player);

                    increment = {
                        roomId: room,
                        player: player.player
                    }

                    socket.emit("increment", (increment));

                    attemptsPlayer2.innerHTML = "Tentativas restantes " + (maxBodyParts - bodyPartsP2);
                } else {
                    showModalMsg("Você não tem moedas suficientes. Aqui")
                }
            }
            // Restante do código relacionado ao facilitador1
        });



        facilitador2.addEventListener("click", function () {
            const valorFacilitador2 = 30;

            if (moedasPerfil.textContent >= valorFacilitador2) {
                verificarEAtualizarMoedas(-valorFacilitador2);

                facilitador2.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #82c762)";
                facilitador2.style.cursor = "not-allowed"
                facilitador2.disabled = true;

                // Lógica para revelar uma letra da palavra
                const hiddenLetters = wordLetters.reduce((acc, letter, index) => {
                    if (hiddenWord[index] === " ") {
                        acc.push(index);
                    }
                    return acc;
                }, []);

                if (hiddenLetters.length > 0) {
                    let randomIndex = null;

                    if (hiddenLetters.length <= 3) {
                        randomIndex = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
                    } else {
                        const filteredLetters = hiddenLetters.filter(index => !wordLetters[index].includes(" "));
                        if (filteredLetters.length > 0) {
                            randomIndex = filteredLetters[Math.floor(Math.random() * filteredLetters.length)];
                        } else {
                            randomIndex = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
                        }
                    }

                    hiddenWord[randomIndex] = wordLetters[randomIndex];
                    drawHiddenWord(hiddenWord);

                    if (hiddenLetters.length <= 3) {
                        facilitador2.disabled = true;
                    }
                }


            } else {
                showModalMsg("Você não tem moedas suficientes. Aqui");
            }
        });


        facilitador3.addEventListener("click", function () {
            const valorFacilitador3 = 25;

            if (moedasPerfil.textContent >= valorFacilitador3) {
                verificarEAtualizarMoedas(-valorFacilitador3);

                facilitador3.querySelector('img').style.filter = "opacity(0.4) drop-shadow(0 0 0 #82c762)";
                facilitador3.disabled = true;
                facilitador3.style.cursor = "not-allowed"

                //availableLetters são as letras que não contem na palavra
                const availableLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter(letter => !wordLetters.includes(letter));

                if (availableLetters.length >= 3) {
                    const removedLetters = [];
                    for (let i = 0; i < 3; i++) {
                        const randomIndex = Math.floor(Math.random() * availableLetters.length);
                        const removedLetter = availableLetters.splice(randomIndex, 1)[0];
                        //removedLetters são as letras que vão ser retiradas aleatoriamente
                        removedLetters.push(removedLetter);
                    }

                    const keys = document.getElementsByClassName("key");
                    for (let i = 0; i < keys.length; i++) {
                        const button = keys[i];
                        const letter = button.textContent;
                        if (removedLetters.includes(letter)) {
                            button.disabled = true;
                            button.classList.add("disabled");
                        }
                    }

                } else {
                    showModalMsg("Não há letras suficientes para remover da palavra.");
                }
            } else {
                showModalMsg("Você não tem moedas suficientes.");
            }
        });

        const btnDicaDiv = document.getElementById("btnDica")
        const textDica = document.getElementById("textDica")

        facilitador4.addEventListener("click", function () {
            const valorfacilitador1 = 20


            if (moedasPerfil.textContent >= valorfacilitador1) {

                verificarEAtualizarMoedas(-valorfacilitador1)
                btnDicaDiv.classList.add("hide")
                textDica.classList.remove("hide")
            } else {
                showModalMsg("Você não tem moedas suficientes. Aqui")
            }
            // Restante do código relacionado ao facilitador1
        });

        const btnSair = document.getElementById('sair')

        btnSair.addEventListener('click', function () {
            defeat = {
                player: player.player,
                roomId: room
            }
            socket.emit("defeat", (defeat));
            window.location.href = "index.html";
        })

        const btnArricar = document.getElementById("enviarArricar")

        btnArricar.addEventListener("click", function () {
            const inputArriscar = document.getElementById('tentativa').value.toUpperCase();
            console.log(inputArriscar);

            if (inputArriscar.trim() !== "") {
                if (inputArriscar === dWord) {
                    closeModalArriscar()
                    showModalWin("Parabéns, você acertou a palavra!")
                    verificarEAtualizarMoedas(premio)
                    victory = {
                        player: player.player,
                        roomId: room
                    }
                    socket.emit("victory", (victory));
                    // stopTimer()
                } else {
                    closeModalArriscar()
                    showModalLoser("Você errou a palavra! A palavra correta era " + dWord)
                    defeat = {
                        player: player.player,
                        roomId: room
                    }
                    socket.emit("defeat", (defeat));
                    //verificarEAtualizarMoedas(-100)
                }
            } else {
                // Caso o input esteja em branco ou nulo
                alert("Digite uma palavra antes de arriscar.")
            }
        });



    });
});



