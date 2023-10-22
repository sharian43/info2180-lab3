var board;
var currentPlayer; // 'X' or 'O';
var rows = 3;
var columns = 3;

window.onload = function () {
  setGame();
  newGame();
};

function setGame() {
  board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  currentPlayer = 'X'; // Start with 'X' player

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("square");
      tile.addEventListener("click", function () {
        if (board[r][c] === 0) {
          // Check if the square is empty
          board[r][c] = currentPlayer;
          updateTile(tile, currentPlayer);
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          checkWin();
        }
      });

      tile.addEventListener("mouseover", function () {
        tile.classList.add("hover");
      });

      tile.addEventListener("mouseout", function () {
        tile.classList.remove("hover");
      });

      document.getElementById("board").appendChild(tile);
    }
  }
}

function updateTile(tile, symbol) {
  tile.innerText = symbol;
  tile.classList.value = ""; // Clear the classList
  tile.classList.add("square", symbol);
}

function checkWin() {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6] // Diagonals
  ];

  for (const combination of winCombinations) {
    const [a, b, c] = combination;
    const squares = document.querySelectorAll(".square");
    if (
      squares[a].classList.contains("X") &&
      squares[b].classList.contains("X") &&
      squares[c].classList.contains("X")
    ) {
      // 'X' player wins
      handleWin('X');
    } else if (
      squares[a].classList.contains("O") &&
      squares[b].classList.contains("O") &&
      squares[c].classList.contains("O")
    ) {
      // 'O' player wins
      handleWin('O');
    }
  }
}

function handleWin(winner) {
  const status = document.getElementById("status");
  status.textContent = "Congratulations! " + winner + " is the Winner!";
  status.classList.add("you-won");
}

function newGame() {
  const newGameButton = document.querySelector(".btn");
  newGameButton.addEventListener("click", function () {
    resetGame(); // Call the resetGame function when the "New Game" button is clicked
  });
}

function resetGame() {
  // Clear the game board by removing "X" or "O" symbols and reset the board state
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    square.textContent = "";
    square.classList.remove("X", "O");
  });

  // Reset the board state to its initial state
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c] = 0;
    }
  }

  // Reset the status message to the original message and remove the "you-won" class
  const status = document.getElementById("status");
  status.textContent = "Move your mouse over a square and click to play an X or an O.";
  status.classList.remove("you-won");

  // Set the game to start with 'X' player
  currentPlayer = 'X';
}
