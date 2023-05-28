const words = [
    { word: "PROGRAMACAO", theme: "Tecnologia", hint: "Conjunto de instruções para realizar uma tarefa" },
    { word: "GATINHO", theme: "Animais", hint: "Animal doméstico fofo" },
    { word: "PRAIA", theme: "Lugares", hint: "Local com areia e mar" },
    // Adicione mais palavras e dicas conforme necessário
  ];
  
  // Seleciona uma palavra aleatória da lista
  const randomWord = words[Math.floor(Math.random() * words.length)];
  
  const themeElement = document.getElementById("theme");
  const hintElement = document.getElementById("hint");
  const hiddenWordElement = document.getElementById("hidden-word");
  
  // Define o tema, palavra e dica no HTML
  themeElement.textContent = "Tema: " + randomWord.theme;
  hintElement.textContent =  randomWord.hint;
  
  // Divide a palavra em letras
  const wordLetters = randomWord.word.split("");
  
  // Inicializa a palavra oculta com underscores
  let hiddenWord = Array(wordLetters.length).fill(" ");
  
  function drawHiddenWord() {
    hiddenWordElement.innerHTML = ""; // Limpa o conteúdo anterior
  
    for (let i = 0; i < hiddenWord.length; i++) {
      const letter = hiddenWord[i];
  
      if (letter !== "  ") {
        const letterBox = document.createElement("div");
        letterBox.className = "letter-box";
        letterBox.textContent = letter;
        hiddenWordElement.appendChild(letterBox);
      } else {
        const space = document.createElement("div");
        space.className = "space";
        hiddenWordElement.appendChild(space);
      }
    }
  }
  
  drawHiddenWord();
  
  // Variáveis para controlar as partes do corpo do boneco
  let bodyParts = 0;
  const maxBodyParts = 6;
  
  // Verifica se a letra fornecida pelo jogador está correta
  function checkLetter(letter, button) {
    let foundLetter = false;
  
    // Verifica se a letra está presente na palavra
    for (let i = 0; i < wordLetters.length; i++) {
      if (wordLetters[i] === letter) {
        hiddenWord[i] = letter;
        foundLetter = true;
      }
    }
  
    // Atualiza o elemento da palavra oculta no HTML
    drawHiddenWord();
  
    // Verifica se o jogador ganhou ou perdeu
    if (!hiddenWord.includes(" ")) {
      alert("Parabéns! Você venceu!");
      location.reload();
    } else if (!foundLetter) {
      // O jogador errou a letra, adiciona uma parte do corpo do boneco
      bodyParts++;
      drawBodyPart(bodyParts);
  
      if (bodyParts === maxBodyParts) {
        alert("Você perdeu! A palavra era: " + randomWord.word);
        location.reload();
      } else {
        alert("Letra incorreta. Tente novamente.");
        button.disabled = true;
        button.classList.add("disabled");
      }
    } else {
      button.disabled = true;
      button.classList.add("hit");
    }
  }
  
  // Função para desenhar uma parte do corpo do boneco na forca
  const imgForcaPlayer1 = document.getElementById('imgPlayer1');
  const imgForcaPlayer2 = document.getElementById('imgPlayer2');
  
  function drawBodyPart(imgValor) {
    imgForcaPlayer1.src = "images/foca" + imgValor + ".png";
    imgForcaPlayer2.src = "images/foca" + imgValor + ".png";
  }
  
  // Função para reiniciar o jogo
  function restartGame() {
    location.reload();
  }
  
  
  // Adiciona os botões das letras no teclado
  const keys = document.getElementsByClassName("key");
  for (let i = 0; i < keys.length; i++) {
    const button = keys[i];
    const letter = button.textContent;
    button.addEventListener("click", function () {
      checkLetter(letter, button);
    });
  }


  const sair = document.getElementById('sair')

  sair.addEventListener('click', function(){
    window.location.href = "index.html";
  } )