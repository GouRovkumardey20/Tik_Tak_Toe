document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');
    const board = Array(9).fill(null);
    let currentPlayer = 'X';

    // Create the game board
    board.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(index));
        boardElement.appendChild(cell);
    });

    function handleCellClick(index) {
        if (board[index] || checkWinner()) {
            return;
        }
        board[index] = currentPlayer;
        renderBoard();
        if (checkWinner()) {
            document.write(`${currentPlayer} wins!`);
        } else if (board.every(cell => cell)) {
            document.write(`It's a draw!`);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function renderBoard() {
        boardElement.childNodes.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }
});