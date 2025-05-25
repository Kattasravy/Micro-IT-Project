const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetBtn = document.getElementById("reset");
    let currentPlayer = "X";
    let gameActive = true;
    let cells = Array(9).fill("");

    const winPatterns = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // columns
      [0,4,8],[2,4,6]          // diagonals
    ];

    function checkWin() {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
          gameActive = false;
          message.textContent = `Player ${cells[a]} wins!`;
          return;
        }
      }

      if (!cells.includes("")) {
        gameActive = false;
        message.textContent = "It's a draw!";
      }
    }
function handleClick(index) {
      if (!gameActive || cells[index]) return;
      cells[index] = currentPlayer;
      render();
      checkWin();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function render() {
      board.innerHTML = "";
      cells.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleClick(index));
        board.appendChild(cellElement);
      });
    }

    resetBtn.addEventListener("click", () => {
      cells = Array(9).fill("");
      gameActive = true;
      currentPlayer = "X";
      message.textContent = "";
      render();
    });

    render();