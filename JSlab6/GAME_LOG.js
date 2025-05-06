let timerId;
let steps = 0;
let minSteps = 0;
let initialBoard;
let boardState = [];
let moveHistory = [];
let stateHistory = [];
let timeLeft = 10 * 60;
let isTimerStarted = false;
let usedConfigs = JSON.parse(localStorage.getItem('usedConfigs')) || [];

async function loadConfig(configNumber) {
    if (![1, 2, 3, 4].includes(configNumber)) {
        console.error("Помилка: неправильний номер конфігурації: " + configNumber);
        return getBackupConfig(configNumber);
    }
    
    const response = await fetch(`https://harazdiuk-ivan.github.io/JS/JSlab6/configs/config${configNumber}.json`);
    if (!response.ok) {
        console.log("Помилка: не вдалося завантажити файл config" + configNumber + ".json");
        return getBackupConfig(configNumber);
    }

    const data = await response.json();
    console.log(`Loaded config ${configNumber} from server`);
    return data;
    
}

function getBackupConfig(configNumber) {
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
    return configs[configNumber] || configs[1]; 
}

function createBoard(board) {
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) {
        console.error('Game board element not found');
        alert('Помилка: не знайдено ігрове поле');
        return;
    }

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
        if (cell) {
            cell.classList.toggle('on');
        }
    }
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (!isTimerStarted) {
        isTimerStarted = true;
        if (timerId) clearInterval(timerId);
        timerId = setInterval(updateTimer, 1000);
        console.log('Timer started');
    }

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
        isTimerStarted = false;
        alert('Час вийшов!');
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
    }
}

function updateStepsDisplay() {
    const stepsElement = document.getElementById('steps');
    if (stepsElement) {
        stepsElement.textContent = `Ходи: ${steps}`;
    }
}

function updateMinStepsDisplay() {
    const minStepsElement = document.getElementById('min-steps');
    if (minStepsElement) {
        minStepsElement.textContent = `Мін. ходів: ${minSteps}`;
    }
}

function checkWin() {
    const allOff = boardState.every(row => row.every(cell => cell === 0));
    if (allOff) {
        clearInterval(timerId);
        isTimerStarted = false;
        alert(`Ви виграли за ${steps} ходів! Дякуємо за гру!`);
        document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
    }
}

async function newGame() {
    console.log('Starting new game');
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) {
        console.error('Game board element not found');
        alert('Помилка: не знайдено ігрове поле');
        return;
    }

    document.querySelectorAll('.cell').forEach(cell => cell.removeEventListener('click', handleCellClick));
    gameBoard.innerHTML = '';

    const availableConfigs = [1, 2, 3, 4].filter(num => !usedConfigs.includes(num));
    if (availableConfigs.length === 0) {
        usedConfigs = [];
        localStorage.setItem('usedConfigs', JSON.stringify(usedConfigs));
        console.log('Reset usedConfigs');
    }
    if (availableConfigs.length === 0) {
        availableConfigs.push(1, 2, 3, 4);
    }
    const configNumber = availableConfigs[Math.floor(Math.random() * availableConfigs.length)];
    console.log(`Selected config: ${configNumber}`);
    usedConfigs.push(configNumber);
    try {
        localStorage.setItem('usedConfigs', JSON.stringify(usedConfigs));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }

    let data;
    try {
        data = await loadConfig(configNumber);
    } catch (error) {
        console.error('Failed to load config:', error);
        alert('Не вдалося завантажити конфігурацію. Спробуйте ще раз.');
        return;
    }

    if (!data || !data.board || !data.minSteps) {
        console.error('Invalid config data:', data);
        alert('Помилка: некоректна конфігурація гри');
        return;
    }

    initialBoard = data.board;
    minSteps = data.minSteps;
    createBoard(initialBoard);
    steps = 0;
    moveHistory = [];
    stateHistory = [];
    isTimerStarted = false;
    updateStepsDisplay();
    updateMinStepsDisplay();
    timeLeft = 10 * 60;
    if (timerId) clearInterval(timerId);
    console.log('New game initialized');
}

function restartGame() {
    if (!initialBoard) {
        console.error('No initial board available');
        alert('Помилка: немає початкової конфігурації для рестарту');
        return;
    }
    createBoard(initialBoard);
    steps = 0;
    moveHistory = [];
    stateHistory = [];
    isTimerStarted = false;
    updateStepsDisplay();
    timeLeft = 10 * 60;
    if (timerId) clearInterval(timerId);
    console.log('Game restarted');
}

document.getElementById('new-game').addEventListener('click', newGame);
document.getElementById('restart').addEventListener('click', restartGame);

newGame();
