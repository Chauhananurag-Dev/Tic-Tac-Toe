const statusMessage = document.getElementById("status");
const restartButton = document.getElementById("restart-button");
const cells = Array.from(document.querySelectorAll(".cell"));

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = "X";
let boardState = Array(9).fill("");
let gameIsActive = true;

function updateStatus(message) {
  statusMessage.textContent = message;
}

function checkWinner() {
  // Check each possible winning line for three same symbols.
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return combination;
    }
  }

  return null;
}

function handleCellClick(event) {
  const cell = event.currentTarget;
  const index = Number(cell.dataset.index);

  if (!gameIsActive || boardState[index]) {
    return;
  }

  boardState[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;

  const winnerCombination = checkWinner();
  if (winnerCombination) {
    gameIsActive = false;
    winnerCombination.forEach((winningIndex) => {
      cells[winningIndex].classList.add("winner");
    });
    updateStatus(`Player ${currentPlayer} Wins!`);
    cells.forEach((gameCell) => {
      gameCell.disabled = true;
    });
    return;
  }

  if (boardState.every((value) => value)) {
    gameIsActive = false;
    updateStatus("It's a Draw!");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`Player ${currentPlayer}'s Turn`);
}

function startNewGame() {
  currentPlayer = "X";
  boardState = Array(9).fill("");
  gameIsActive = true;
  updateStatus("Player X's Turn");

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o", "winner");
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", startNewGame);
