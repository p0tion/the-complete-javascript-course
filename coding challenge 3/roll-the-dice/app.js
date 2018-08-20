/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, activePlayer, previousScore, currentScore, activeGame, finalScore;
const active = 'active';
const winner = 'winner';
const none = 'none';

init();

document.querySelector('.btn-new').addEventListener('click', function () {
    activeGame = false;
    init();
    var finalScoreDiv = document.querySelector('.final-score');
    var inputDom = document.querySelector('.score-input');
    inputDom.value = '';
    inputDom.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        var inputValue = inputDom.value;
        if (key === 13 && inputValue > 0 && inputValue < 1000) {
            finalScore = inputDom.value;
            finalScoreDiv.style.display = none;
            activeGame = true;
        }
    });
    finalScoreDiv.style.display = 'block';
});

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (activeGame) {
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);
        var sum;
        var diceDom1 = document.querySelector('.dice1');
        var diceDom2 = document.querySelector('.dice2');
        diceDom1.src = 'dice-' + dice1 + '.png';
        diceDom2.src = 'dice-' + dice2 + '.png';
        diceDom1.style.display = 'block';
        diceDom2.style.display = 'block';
        if (dice1 !== 1 && dice2 !== 1) {
            sum = dice1 + dice2;
            if (previousScore === 6 && sum === 6) {
                currentScore = 0;
                scores[activePlayer] = currentScore;
                document.getElementById('current-' + activePlayer).textContent = scores[activePlayer];
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
                nextPlayerMove();
            } else {
                previousScore = sum;
                currentScore += sum;
                document.getElementById('current-' + activePlayer).textContent = currentScore;
            }
        } else {
            currentScore = 0;
            document.getElementById('current-' + activePlayer).textContent = currentScore;
            nextPlayerMove();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (activeGame) {
        scores[activePlayer] += currentScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        currentScore = 0;
        document.getElementById('current-' + activePlayer).textContent = currentScore;
        if (scores[activePlayer] >= finalScore) {
            playerWon();
        } else {
            nextPlayerMove();
        }
    }
});

function playerWon() {
    document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
    document.querySelector('.dice1').style.display = none;
    document.querySelector('.dice2').style.display = none;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove(active);
    document.querySelector('.player-' + activePlayer + '-panel').classList.add(winner);
    activeGame = false;
}

function nextPlayerMove() {
    previousScore = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove(active);
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector('.player-' + activePlayer + '-panel').classList.add(active);
}

function init() {

    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;

    document.querySelector('.player-0-panel').classList.remove(active);
    document.querySelector('.player-1-panel').classList.remove(active);
    document.querySelector('.player-0-panel').classList.add(active);
    document.querySelector('.player-0-panel').classList.remove(winner);
    document.querySelector('.player-1-panel').classList.remove(winner);
    document.querySelector('.dice1').style.display = none;
    document.querySelector('.dice2').style.display = none;
    document.getElementById('score-0').textContent = currentScore;
    document.getElementById('score-1').textContent = currentScore;
    document.getElementById('current-0').textContent = currentScore;
    document.getElementById('current-1').textContent = currentScore;
    document.getElementById('name-0').textContent = 'PLAYER 1';
    document.getElementById('name-1').textContent = 'PLAYER 2';
}