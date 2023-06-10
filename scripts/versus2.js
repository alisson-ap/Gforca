const letterButtons = document.querySelectorAll('.letters button');
const wordDisplays = document.querySelectorAll('.word p');
const countdownElement = document.getElementById('countdown');

let currentPlayerIndex = 0; // Índice do jogador atual
let players = [
  { name: 'Jogador 1', attempts: 0 }, // Jogador 1
  { name: 'Jogador 2', attempts: 0 }  // Jogador 2
];


disableKeyboard(players[1].name); // Desativa o teclado do jogador 2 inicialmente

letterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const letter = button.textContent;
    button.disabled = true;
    button.classList.add('clicked');

    const currentPlayer = players[currentPlayerIndex];

    currentPlayer.attempts++;
    startCountdown(); // Reinicia a contagem regressiva

    wordDisplays.forEach((display) => {
      const word = display.textContent;
      const updatedWord = word
        .split('')
        .map((char) => (char === letter ? char : '_'))
        .join('');
      display.textContent = updatedWord;
    });

    if (currentPlayer.attempts >= 5) {
      // Se o jogador atual atingir o limite de tentativas
      disableRemainingLetters(); // Desativa as letras restantes
      const winner = players[1 - currentPlayerIndex].name; // Obtém o nome do outro jogador
      showModal(`${winner} venceu!`);
    } else {
      switchPlayers(); // Troca para o próximo jogador
    }

    disableKeyboard(currentPlayer.name); // Desativa o teclado do jogador atual
    disableKeyboard(players[1 - currentPlayerIndex].name); // Desativa o teclado do outro jogador
  });
});

const modal = document.getElementById('modal');
const modalContent = modal.querySelector('.modal-content');
const closeModalBtn = modal.querySelector('.close');

function showModal(message) {
  modalContent.innerHTML = `<h3>${message}</h3>`;
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
  resetGame();
}

closeModalBtn.addEventListener('click', closeModal);
document.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

function disableKeyboard(playerName) {
  const currentPlayerLetters = document.querySelectorAll(`.${playerName.toLowerCase().replace(/\s/g, '')} .letters button`);
  currentPlayerLetters.forEach((button) => {
    button.disabled = true;
    button.classList.remove('clicked');
  });
}

function disableRemainingLetters() {
  letterButtons.forEach((button) => {
    if (!button.classList.contains('clicked')) {
      button.disabled = true;
    }
  });
}

function switchPlayers() {
  currentPlayerIndex = 1 - currentPlayerIndex; // Alterna para o próximo jogador

  startCountdown(); // Inicia a contagem regressiva
}

let countdown = 15; // Contagem regressiva de 15 segundos
let countdownInterval; // Referência para o intervalo da contagem regressiva

function startCountdown() {
  clearInterval(countdownInterval);
  countdown = 15;
  countdownElement.textContent = countdown;

  countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      switchPlayers();
    }
  }, 1000);
}
