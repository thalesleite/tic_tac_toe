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
    if (board[row][collumn].getValue() !== 0) return

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

function GameController(playerOne = "Player Oner", playerTwo = "Player Two") {
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

    if (gameFinished()) {
      console.log("Game finished.")
      // const winner = getWinner()
      // if (winner) {
      //   console.log(`${winner.name} wins!`)
      // } else {
      //   console.log("It's a draw!")
      // }
      return
    }

    switchPlayerTurn()
    newRound()
  }

  const gameFinished = () => {
    const currentBoard = board.getBoard()

    for (let index = 0; index < currentBoard.length; index++) {
      if (
        currentBoard[index][0].getValue() !== 0 &&
        currentBoard[index][0].getValue() ===
          currentBoard[index][1].getValue() &&
        currentBoard[index][0].getValue() === currentBoard[index][2].getValue()
      ) {
        // Horizontal win
        return true
      }

      if (
        currentBoard[0][index].getValue() !== 0 &&
        currentBoard[0][index].getValue() ===
          currentBoard[1][index].getValue() &&
        currentBoard[0][index].getValue() === currentBoard[2][index].getValue()
      ) {
        // Verical win
        return true
      }
    }
  }

  newRound()

  return {
    playRound,
  }
}

const game = GameController()
game.playRound(2, 0)
game.playRound(1, 1)
game.playRound(2, 1)
game.playRound(0, 2)
game.playRound(2, 2)
