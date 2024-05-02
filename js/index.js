function Gameboard() {
  const rows = 3
  const collumns = 3
  const board = []

  for (let i = 0; i < rows; i++) {
    board[i] = []

    for (let j = 0; j < collumns; j++) {
      board[i].push(Square())
    }
  }

  const getBoard = () => board

  const markBoard = (row, collumn, player) => {
    if (board[row][collumn].getValue() !== 0) {
      console.log("This square is already occupied. Please choose another one.")
      return
    }

    board[row][collumn].addToken(player)
    printBoard()
  }

  const printBoard = () => {
    const boardWithCellValues = board.map((row) =>
      row.map((cell) => cell.getValue())
    )
    console.log(boardWithCellValues)
  }

  return {
    getBoard,
    markBoard,
    printBoard,
  }
}

function Square() {
  let value = 0

  const addToken = (player) => {
    value = player
  }

  const getValue = () => value

  return {
    addToken,
    getValue,
  }
}

function GameController(playerOne = "Player One", playerTwo = "Player Two") {
  const board = Gameboard()

  const players = [
    {
      name: playerOne,
      token: "X",
    },
    {
      name: playerTwo,
      token: "O",
    },
  ]
  let activePlayer = players[0]

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }

  const getActivePlayer = () => activePlayer

  const newRound = () => {
    board.printBoard()
    console.log(`${getActivePlayer().name}'s turn.`)
  }

  const playRound = (row, collumn) => {
    console.log(
      `Marking ${
        getActivePlayer().name
      }'s token into square (${row}, ${collumn})...`
    )
    board.markBoard(row, collumn, getActivePlayer().token)

    const gameAnalises = checkGameFinished()

    if (gameAnalises.isFinished) {
      console.log("Game finished.")
      const winner = getWinner(gameAnalises.winner)

      if (winner.token !== "DRAW") {
        console.log(`The winner is: ${winner.name}`)
      } else {
        console.log(`It is a DRAW!`)
      }

      return
    }

    switchPlayerTurn()
    newRound()
  }

  const checkGameFinished = () => {
    const currentBoard = board.getBoard()

    for (let index = 0; index < currentBoard.length; index++) {
      if (
        currentBoard[index][0].getValue() !== 0 &&
        currentBoard[index][0].getValue() ===
          currentBoard[index][1].getValue() &&
        currentBoard[index][0].getValue() === currentBoard[index][2].getValue()
      ) {
        // Horizontal win
        return {
          isFinished: true,
          winner: currentBoard[index][0].getValue(),
        }
      }

      if (
        currentBoard[0][index].getValue() !== 0 &&
        currentBoard[0][index].getValue() ===
          currentBoard[1][index].getValue() &&
        currentBoard[0][index].getValue() === currentBoard[2][index].getValue()
      ) {
        // Verical win
        return {
          isFinished: true,
          winner: currentBoard[0][index].getValue(),
        }
      }
    }

    if (
      currentBoard[0][0].getValue() !== 0 &&
      currentBoard[0][0].getValue() === currentBoard[1][1].getValue() &&
      currentBoard[0][0].getValue() === currentBoard[2][2].getValue()
    ) {
      // Diagonal win (top-left to bottom-right)
      return {
        isFinished: true,
        winner: currentBoard[0][0].getValue(),
      }
    }
    if (
      currentBoard[0][2].getValue() !== 0 &&
      currentBoard[0][2].getValue() === currentBoard[1][1].getValue() &&
      currentBoard[0][2].getValue() === currentBoard[2][0].getValue()
    ) {
      // Diagonal win (top-right to bottom-left)
      return {
        isFinished: true,
        winner: currentBoard[0][2].getValue(),
      }
    }

    // check for draw
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (currentBoard[i][j].getValue() === 0) {
          return {
            isFinished: false,
            winner: 0,
          }
        }
      }
    }
    // Draw
    return {
      isFinished: true,
      winner: "DRAW",
    }
  }

  const getWinner = (token) => {
    if (token === "X") return players[0]
    if (token === "O") return players[1]
    return {
      name: "None",
      token: "DRAW",
    }
  }

  newRound()

  return {
    playRound,
  }
}

const game = GameController()

// Simulate Player's One winner
// game.playRound(2, 0)
// game.playRound(1, 1)
// game.playRound(2, 1)
// game.playRound(0, 2)
// game.playRound(2, 2)

// Simulate Player's Two winner
// game.playRound(2, 0)
// game.playRound(1, 1)
// game.playRound(0, 0)
// game.playRound(1, 0)
// game.playRound(0, 2)
// game.playRound(1, 2)

// Simulate Draw
game.playRound(2, 0)
game.playRound(1, 1)
game.playRound(0, 0)
game.playRound(1, 0)
game.playRound(0, 2)
game.playRound(0, 1)
game.playRound(1, 2)
game.playRound(2, 2)
game.playRound(2, 1)
