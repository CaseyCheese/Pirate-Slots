// Caching DOM element references
const balanceSpan = document.querySelector('.balance-span');
const depositInput = document.querySelector('.deposit-input');
const enterBtn = document.querySelector('.enter-btn');

const h1 = document.querySelector('h1');
const prizeH4 = document.querySelector('.prize-h4');
const prizeId = document.querySelector('#prize-id');
const winMessageH4 = document.querySelector('.win-message-h4');

const slotLocations = [document.querySelector('#slot1'), document.querySelector('#slot2'), document.querySelector('#slot3')];

const coinsSpan = document.querySelector('.coins-span');
const betSpan = document.querySelector('.bet-span');
const winP = document.querySelector('.win-p');
const winSpan = document.querySelector('.win-span');

const withdrawBtn = document.querySelector('.withdraw-btn');
const playBtn = document.querySelector('.play-btn');
const betSizeBtns = document.querySelectorAll('ul button');

const mainDiv = document.querySelector('main')
const menuDiv = document.querySelector('.menu-section')


// Button setup
enterBtn.addEventListener('click', handleEnter);
withdrawBtn.addEventListener('click', handleWithdraw);
playBtn.addEventListener('click', handlePlay);
for (let bet of betSizeBtns) {
    bet.addEventListener('click', changeBet);
}


// Event handlers
function handleEnter() {
    const deposit = Number(depositInput.value);
    const balance = Number(balanceSpan.textContent);

    // Checking for valid input
    if (deposit >= 1 && deposit <= balance && deposit === Math.floor(deposit)) {
        balanceSpan.textContent -= deposit;
        coinsSpan.textContent = deposit;
        checkBalance();
        menuDiv.style.display = 'none'; // "Closes" the starting menu screen
        mainDiv.style.display = 'block'; // "Launches" the slot machine
        depositInput.value = '';
        depositInput.classList.remove('red');
        depositInput.placeholder = 'Enter deposit value';
    } else {
        depositInput.value = '';
        depositInput.classList.add('red');
        depositInput.placeholder = 'Invalid value input';
    }
}

function handleWithdraw() {
    let coins = Number(coinsSpan.textContent);
    let balance = Number(balanceSpan.textContent);

    balanceSpan.textContent = balance + coins;

    // Win/Lose message display
    if (coins > 0) {
        h1.textContent = `Congratulations! You won ${coins} coins`;
    } else if (balance >= 1) {
        h1.textContent = 'You lose. Try again.';
    } else {
        h1.textContent = 'You have lost.';
        depositInput.remove();
        document.querySelector('.menu-section>p').textContent = 'You are bankrupt.';

        // Button that refreshes the web page
        enterBtn.textContent = 'RESET';
        enterBtn.addEventListener('click', () => location.reload());
    }
    setTimeout(() => h1.textContent = 'Loot of Blackbeard', 7500);

    // Resetting attributes to original state
    mainDiv.style.display = 'none'; // "Closes" the slot machine
    menuDiv.style.display = 'block'; // "Launches" the starting menu screen
    coins = 0;
    betSpan.textContent = 1;
    winSpan.textContent = 0;
}

function handlePlay() {
    let bet = Number(betSpan.textContent);

    // Spend coins
    coinsSpan.textContent = Number(coinsSpan.textContent) - bet;

    // Get random slots
    let randomiseSlots = [Math.floor(Math.random()*3) + 1, Math.floor(Math.random()*3) + 1, Math.floor(Math.random()*3) + 1];

    // Link image with random play
    for (let i = 0; i < randomiseSlots.length; i++) {
        if (randomiseSlots[i] === 1) {
            slotLocations[i].src = 'images/slots-canon.jpg';
        } else if (randomiseSlots[i] === 2) {
            slotLocations[i].src = 'images/slots-pirate.jpg';
        } else {
            slotLocations[i].src = 'images/slots-treasure.jpg';
        }
    }

    // Win condition
    if (randomiseSlots.toString() ==='1,1,1') {
        winSpan.textContent = bet * 2;
        userWin();
    } else if (randomiseSlots.toString() ==='2,2,2') {
        winSpan.textContent = bet * 3;
        userWin();
    } else if (randomiseSlots.toString() ==='3,3,3') {
        winSpan.textContent = bet * 10;
        userWin();

        prizeH4.style.display = 'none';
        winMessageH4.style.display = 'block';
        setTimeout(() => {
            winMessageH4.style.display = 'none';
            prizeH4.style.display = 'block';
        }, 7500);
    }

    checkBalance();
}


// Other functions
function checkBalance() {
    let coins = Number(coinsSpan.textContent);

    // Disables the bet-size buttons when the user cannot afford to use them
    for (let bet of betSizeBtns) {
        if (Number(bet.textContent) > coins) {
            bet.disabled = true;
        } else {
            bet.disabled = false;
        }
    }

    // Adjusts the maximum bet to match the user's current coins when the bet amounts exceeds the total number of coins
    if (Number(betSpan.textContent) > coins) {
        betSpan.textContent = coins;
    }
    prizeId.textContent = Number(betSpan.textContent) * 10;

    // Exits the slot machine once the user runs out of coins
    if (coins <= 0) {
        handleWithdraw();
    }    
}

function changeBet(event) {
    let bet = event.target.textContent;

    // Adjusts bet and prize amounts
    betSpan.textContent = bet;
    prizeId.textContent = Number(bet) * 10;
}

function userWin() {
    let coins = Number(coinsSpan.textContent);
    let win = Number(winSpan.textContent);

    // Show win amount
    winP.style.display = 'block';
    setTimeout(() => winP.style.display = 'none', 7500);
    coinsSpan.textContent = coins + win;
}