let boardState = [];
let initialBoard;
let steps = 0;
let timeLeft = 10 * 60;
let timerId;
let usedConfigs = JSON.parse(localStorage.getItem('usedConfigs')) || [];
let minSteps = 0;
let moveHistory = []; 
let stateHistory = []; 

async function loadConfig(configNumber) {
    try {
        const response = await fetch(`https://harazdiuk-ivan.github.io/JS/JSlab6/configs/config${configNumber}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load config${configNumber}.json`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading config:', error);
        const configs = {
            1: {
                board: [
                    [1, 1, 1, 1, 1],
                    [0, 0, 1, 0, 0],
                    [1, 0, 1, 0, 1],
                    [1, 0, 1, 1, 1],
                    [0, 1, 0, 0, 1]
                ],
                minSteps: 7
            },
            2: {
                board: [
                    [1, 0, 1, 0, 0],
                    [0, 1, 1, 1, 1],
                    [0, 0, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 1, 1, 1, 0]
                ],
                minSteps: 8
            },
            3: {
                board: [
                    [1, 0, 0, 0, 0],
                    [0, 1, 1, 0, 1],
                    [1, 0, 0, 1, 1],
                    [0, 0, 1, 1, 1],
                    [1, 1, 0, 0, 0]
                ],
                minSteps: 9
            },
            4: {
                board: [
                    [0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0],
                    [0, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0]
                ],
                minSteps: 1
            }
        };
        return configs[configNumber];
    }
}

function createBoard(board) {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    boardState = board.map(row => row.slice());
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = document.createElement('div');
            div.classList.add('cell');
            if (cell === 1) div.classList.add('on');
            div.dataset.row = rowIndex;
            div.dataset.col = colIndex;
            div.addEventListener('click', handleCellClick);
            gameBoard.appendChild(div);
        });
    });
}

function toggleCell(row, col) {
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        boardState[row][col] = 1 - boardState[row][col];
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.classList.toggle('on');
    }
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

     if (moveHistory.length > 0 && moveHistory[moveHistory.length - 1].row === row && moveHistory[moveHistory.length - 1].col === col) {
        boardState = stateHistory.pop().map(row => row.slice());
        moveHistory.pop();
        steps--;
        createBoard(boardState);
    } else {
        stateHistory.push(boardState.map(row => row.slice()));
        moveHistory.push({ row, col });

        toggleCell(row, col);
        toggleCell(row - 1, col);
        toggleCell(row + 1, col);
        toggleCell(row, col - 1);
        toggleCell(row, col + 1);
        steps++;
    }

    updateStepsDisplay();
    checkWin();
}

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent = `Таймер: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (timeLeft > 0) {
        timeLeft--;
    } else {
        clearInterval(timerId);
        alert('Час вийшов!');
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
    }
}

function updateStepsDisplay() {
    document.getElementById('steps').textContent = `Ходи: ${steps}`;
}

function updateMinStepsDisplay() {
    document.getElementById('min-steps').textContent = `Мін. ходів: ${minSteps}`;
}

function checkWin() {
    const allOff = boardState.every(row => row.every(cell => cell === 0));
    if (allOff) {
        clearInterval(timerId);
        alert(`Ви виграли за ${steps} ходів!`);
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
    }
}

async function newGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));

    const availableConfigs = [1, 2, 3, 4].filter(num => !usedConfigs.includes(num));
    if (availableConfigs.length === 0) {
        usedConfigs = [];
        localStorage.setItem('usedConfigs', JSON.stringify(usedConfigs));
    }
    const configNumber = availableConfigs[Math.floor(Math.random() * availableConfigs.length)];
    usedConfigs.push(configNumber);
    localStorage.setItem('usedConfigs', JSON.stringify(usedConfigs));
    
    const data = await loadConfig(configNumber);
    initialBoard = data.board;
    minSteps = data.minSteps;
    createBoard(initialBoard);
    steps = 0;
    moveHistory = []; 
    stateHistory = []; 
    updateStepsDisplay();
    updateMinStepsDisplay();
    timeLeft = 10 * 60;
    clearInterval(timerId);
    timerId = setInterval(updateTimer, 1000);
}

function restartGame() {
    createBoard(initialBoard);
    steps = 0;
    moveHistory = []; 
    stateHistory = []; 
    updateStepsDisplay();
    timeLeft = 10 * 60;
    clearInterval(timerId);
    timerId = setInterval(updateTimer, 1000);
}

document.getElementById('new-game').addEventListener('click', newGame);
document.getElementById('restart').addEventListener('click', restartGame);

newGame();
