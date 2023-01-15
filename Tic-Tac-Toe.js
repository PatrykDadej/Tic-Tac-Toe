const allCells = document.querySelectorAll('.cell');
const gameSelector = document.querySelector('.game');
const startGameSelector = document.querySelector('#start');
const xInput = document.querySelector('#playerXname');
const oInput = document.querySelector('#playerOname');
const overlaySelector = document.querySelector('.overlay');
const restartSelector = document.querySelector('#restart');
const welcomeScreenSelector = document.querySelector('.welcomeScreen');
const resultSelector = document.querySelector('.result');
let drawArray = [];

function erase() {
  allCells.forEach((element) => {
    element.classList.remove('oMarked');
    element.classList.remove('xMarked');
  });
}

function drawChecker() {
  drawArray = [];
  allCells.forEach((validator) => {
    if (validator.getAttribute('class').includes('oMarked') || validator.getAttribute('class').includes('xMarked')) {
      drawArray.push(validator.getAttribute('id'));
    }
  });
  if (drawArray.length == 9) {
    const popup = document.querySelector('.endGameScreen');
    resultSelector.textContent = 'Draw !';
    openPopup(popup);
  }
}

restartSelector.addEventListener('click', () => {
  closePopup();
  welcomeScreenSelector.classList.add('active');
  overlaySelector.classList.add('active');
});

function closePopup() {
  const popup = document.querySelector('.active');
  popup.classList.remove('active');
  overlaySelector.classList.remove('active');
  window.playerX = player(xInput.value);
  window.playerO = player(oInput.value);
  erase();
}

function openPopup(popup) {
  popup.classList.add('active');
  overlaySelector.classList.add('active');
}

startGameSelector.addEventListener('click', () => {
  if (xInput.value.length == 0 || oInput.value.length == 0) {
    alert('Please provide name for both players');
  } else {
    closePopup();
  }
});

const player = function (name) {
  const playerName = name;
  const scoredFields = [];
  const markField = function (field) {
    scoredFields.push(field);
  };
  const winner = function (playerName) {
    console.log(`You won ${playerName}`);
  };
  const checker = function () {
    if ((scoredFields.includes('field1') && scoredFields.includes('field2') && scoredFields.includes('field3'))
        || (scoredFields.includes('field4') && scoredFields.includes('field5') && scoredFields.includes('field6'))
        || (scoredFields.includes('field7') && scoredFields.includes('field8') && scoredFields.includes('field9'))
        || (scoredFields.includes('field1') && scoredFields.includes('field4') && scoredFields.includes('field7'))
        || (scoredFields.includes('field2') && scoredFields.includes('field5') && scoredFields.includes('field8'))
        || (scoredFields.includes('field3') && scoredFields.includes('field6') && scoredFields.includes('field9'))
        || (scoredFields.includes('field1') && scoredFields.includes('field5') && scoredFields.includes('field9'))
        || (scoredFields.includes('field3') && scoredFields.includes('field5') && scoredFields.includes('field7'))
    ) {
      winner(playerName);
      const popup = document.querySelector('.endGameScreen');
      resultSelector.textContent = `${playerName} has won the Game !`;
      openPopup(popup);
    } else { return false; }
  };
  return {
    playerName, markField, scoredFields, checker,
  };
};

allCells.forEach((cell) => {
  cell.addEventListener('click', () => {
    if (cell.classList.contains('xMarked') || cell.classList.contains('oMarked')) { /* empty */
    } else if (gameSelector.classList.contains('x')) {
      cell.classList.add('xMarked');
      gameSelector.classList.remove('x');
      gameSelector.classList.add('o');
      playerX.markField(cell.getAttribute('id'));
      playerX.checker();
      if (playerX.checker() == false) {
        drawChecker();
      }
    } else if (gameSelector.classList.contains('o')) {
      cell.classList.add('oMarked');
      gameSelector.classList.remove('o');
      gameSelector.classList.add('x');
      playerO.markField(cell.getAttribute('id'));
      playerO.checker();
      if (playerO.checker() == false) {
        drawChecker();
      }
    }
  });
});
