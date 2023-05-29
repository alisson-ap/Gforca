  const themeElement = document.getElementById("theme");
  const hintElement = document.getElementById("hint");
  const hiddenWordElement = document.getElementById("hidden-word");

  const usersRef = firebase.firestore().collection("users");
  const auth = firebase.auth();

showLoading();
 fetchWordsWithTips()
    .then(() => {
      
    const randomWord = wordsWithTips[Math.floor(Math.random() * wordsWithTips.length)];
    const dWord = randomWord.word.toUpperCase();
    const dTheme = randomWord.theme.toUpperCase()
    const dTips =  randomWord.tips[0].nameTips


    // Define o tema, palavra e dica no HTML
    themeElement.textContent = "Tema: " + dTheme;

    hintElement.textContent = dTips;
    
    // Divide a palavra em letras
    const wordLetters = dWord.split("");
    
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
      console.log(letter)
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
          alert("Você perdeu! A palavra era: " + dWord);
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

    const keys = document.getElementsByClassName("key");
    for (let i = 0; i < keys.length; i++) {
      const button = keys[i];
      const letter = button.textContent;
      button.addEventListener("click", function () {
        checkLetter(letter, button);
      });
    }



    


















    setTimeout(() =>{
      hideLoading();
    }, 1000)
      
    })
    .catch((error) => {
      console.error("Erro ao buscar palavras: ", error);
      hideLoading();
    });
 

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
  const sair = document.getElementById('sair')
  sair.addEventListener('click', function(){
    window.location.href = "index.html";
  } )














  const moedasPerfil = document.getElementById('moedas')
  const dPlayer1 = document.getElementById('dPlayer1')


    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      if(user){         
          usersRef.doc(uid).get()
          .then((doc) => {
            if (doc.exists) {
              // o documento do usuário existe, recupere as informações
              
              const data = doc.data();
              const nome = data.name;
              const moedas = data.money;
              const partidasGanhas = data.partidasGanhas;
              const partidasPerdidas = data.partidasPerdidas
              
              // emailPerfil.innerHTML = email
              // nomePerfil.innerHTML = nome

              moedasPerfil.innerHTML = moedas
              dPlayer1.innerHTML = "Player 1 - " + nome
              //partidasGanhasPerfil.innerHTML = partidasGanhas
              //hideLoading()
              //console.log(nome,email,moedas,profile,partidasGanhas, doc.data())
              // execute as ações para exibir as informações na tela
            } else {
              // o documento do usuário não existe
              console.log("Documento do usuário não encontrado.");
            }
          })
          .catch((error) => {
            console.log("Erro ao recuperar informações do usuário: ", error);
          });
      }
  
    });


  




    const tooltipButtons = document.querySelectorAll('.tooltip-button');
    let tooltip;
    
    tooltipButtons.forEach(button => {
      button.addEventListener('mouseenter', function() {
        const text = this.dataset.text;
        showTooltip(text, button);
      });
    
      button.addEventListener('mouseleave', function() {
        hideTooltip();
      });
    });
    
    function showTooltip(message, button) {
      hideTooltip();
    
      tooltip = document.createElement('div');
      tooltip.classList.add('tooltip');
      tooltip.textContent = message;
      button.appendChild(tooltip);
    }
    
    function hideTooltip() {
      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }
    }