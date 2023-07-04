const getNewPlayer = (symbol, name) => {
  const getSymbol = () => symbol;
  const getName = () => name;
  return { getName, getSymbol };
};

const game = (() => {
  let a = 4;
  const player0 = getNewPlayer("X", "Abbas");
  const player1 = getNewPlayer("O", "Askari");
  let player0Turn = true;
  let gameOver = false;
  let winner = false;
  const getCurrentPlayer = () => (player0Turn ? player0 : player1);
  const changeTurn = () => (player0Turn = !player0Turn);
  let board;
  const setBoard = (b) => (board = b);
  const handleOver = () => {
    const rowWin = board.reduce(
      (acc, row, i) =>
        (row.every((v, i) => i == 0 || (v === row[i - 1] && v))
          ? row[0]
          : false) || acc,
      false
    );
    const colWin = Array(3)
      .fill(0)
      .map((e, i) => i)
      .reduce(
        (acc, i) =>
          (board.every(
            (row, rowNum) =>
              rowNum == 0 || (row[i] === board[rowNum - 1][i] && row[i])
          )
            ? board[0][i]
            : false) || acc,
        false
      );
    winner = rowWin || colWin;
    if (winner) gameOver = true;
  };

  const handleClick = (i) => {
    if (gameOver) return;
    const x = i % 3;
    const y = Math.floor(i / 3);
    if (!board[y][x]) {
      board[y][x] = getCurrentPlayer().getSymbol();
      changeTurn();
      gameBoard.updateGameBoard();
      console.log("Yay");
      handleOver();
    } else {
    }
    elements.updateTurn(winner);
  };

  return { a, getCurrentPlayer, handleClick, setBoard, winner };
})();

const gameBoard = (() => {
  const cells = Array.from(document.querySelectorAll(".cell"));
  cells.forEach((cell, i) => {
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", () => game.handleClick(i));
  });

  const board = Array(3)
    .fill(0)
    .map((e) => 0)
    .map((e) => Array(3).fill(""));

  const updateGameBoard = () =>
    cells.forEach(
      (cell, i) => (cell.textContent = board[Math.floor(i / 3)][i % 3])
    );

  return { board, updateGameBoard };
})();

const elements = (() => {
  const turnElement = document.querySelector("#turn");

  const updateTurn = (winner) => {
    console.log({ Winner: winner });
    console.log("Updating");
    const symbol = winner ? winner : game.getCurrentPlayer().getSymbol();
    const text = winner ? "Winner: " : "Player: ";
    turnElement.textContent = text + symbol;
  };

  const renderWinner = () => {};
  return { updateTurn };
})();

game.setBoard(gameBoard.board);

console.log(game);
console.log(gameBoard);
