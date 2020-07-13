const gameStatus = document.querySelector('.status');

let gameActive = true; //change later
let currentPlayer = "X";
let position = ["", "", "", "", "", "", "", "", ""];

const win = () => `Player ${currentPlayer} has won!`;
const draw = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

gameStatus.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function cellChange(clickedCell, clickedCellIndex) {
    position[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameStatus.innerHTML = currentPlayerTurn();
}

function result() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = position[winCondition[0]];
        let b = position[winCondition[1]];
        let c = position[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
        
    }

    if (roundWon) {
        gameStatus.innerHTML = win();
        gameStatus.style.color ="green"
        gameActive = false;
        return;
    }

    let roundDraw = !position.includes("");
    if (roundDraw) {
        gameStatus.innerHTML = draw();
        gameActive = false;
        return;
    }

    playerChange();
}

function cellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (position[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    cellChange(clickedCell, clickedCellIndex);
    result();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    position = ["", "", "", "", "", "", "", "", ""];
    gameStatus.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClick));
document.querySelector('.restart').addEventListener('click', restartGame);