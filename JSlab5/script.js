document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('start-button');
    const setupDiv = document.getElementById('setup');
    const gameContainer = document.getElementById('game-container');
    const block = document.getElementById('block');
    const scoreSpan = document.getElementById('score');
    const timeLeftSpan = document.getElementById('time-left');

    let score = 0;
    let timeLeft = 30;
    let timer;
    let gameActive = false;
    let currentDifficulty; 

    startButton.addEventListener('click', function () {
        currentDifficulty = document.getElementById('difficulty').value;
        const color = document.getElementById('color').value;
        block.style.backgroundColor = color;

        setupDiv.style.display = 'none';
        gameContainer.style.display = 'block';

        startGame(currentDifficulty);
    });

    function startGame(difficulty) {
        score = 0;
        scoreSpan.textContent = score;
        gameActive = true;
        block.style.pointerEvents = 'auto';

        let blockSize; 
        if(difficulty === 'lazy'){
            blockSize = 50; 
        }
        else if(difficulty === 'normal'){
            blockSize = 40; 
        }
        else if(difficulty === 'hard'){
            blockSize = 30;
        }
        block.style.width = blockSize + 'px';
        block.style.height = blockSize + 'px';

        moveBlock(difficulty);
        setTimeLeft(difficulty);
    }

    function moveBlock(difficulty) {
        if (!gameActive) return;

        const gameArea = gameContainer.getBoundingClientRect();
        const maxX = gameArea.width - block.offsetWidth;
        const maxY = gameArea.height - block.offsetHeight;

        let randomX, randomY;
        if(difficulty === 'lazy'){
            randomX = Math.random() * maxX * 0.5; 
            randomY = Math.random() * maxY * 0.5; 
        }
        else if(difficulty === 'normal'){
            randomX = Math.random() * maxX * 0.75; 
            randomY = Math.random() * maxY * 0.75;

        }
        else if(difficulty === 'hard'){
            randomX = Math.random() * maxX; 
            randomY = Math.random() * maxY;
        }

        block.style.left = randomX + 'px';
        block.style.top = randomY + 'px';

    }

    function setTimeLeft(difficulty) {

        if(difficulty === 'lazy'){
            timeLeft = 8; 
        }
        else if(difficulty === 'normal'){
            timeLeft = 4; 
        }
        else if(difficulty === 'hard'){
            timeLeft = 1;
        }
        timeLeftSpan.textContent = timeLeft;
        
        clearInterval(timer);

        timer = setInterval(function(){
            timeLeft = timeLeft - 1;
            timeLeftSpan.textContent = timeLeft;
            if(timeLeft <= 0){
                clearInterval(timer);
                endGame();
            }
        },1000);
    }

    block.addEventListener('click', function(){
        if(!gameActive) return;

        score += 1;
        scoreSpan.textContent = score;

        clearInterval(timer);

        moveBlock(currentDifficulty);
        setTimeLeft(currentDifficulty);
    });

    function endGame() {
        gameActive = false; 
        alert('Гра завершена! Ваш рахунок: ' + score); 
        block.style.pointerEvents = 'none'; 
    }

});    
