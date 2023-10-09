//--------Constant Variables----------

//set Constant variables
//Number of cars in deck

//--------State Variables-------------
//cards in hand
let handCards;
//wins and losses of hands
let wins;
let losses;
//players money pot
let playerBank;
//amount for bet
let amountBet = 0;

let shuffledDeck;

let suits;
let ranks;

let originalDeck;


//--------Cached DOM Elements---------
//cache the buttons
    //play again
const playAgainBtn = document.querySelector('#play-again');
    //bet 1 or 5
const betOneBtn = document.querySelector('#bet-one');
const betThreeBtn = document.querySelector('#bet-three');
const placeBetBtn = document.querySelector('#place-bet')
    //stand
const standBtn = document.querySelector('#stand');
    //hit
const hitBtn = document.querySelector('#hit');
//cache the elements of DOM that need to be updated by render()
    //amount bet
    //cards in hand
const alertEl = document.querySelector('#alert');
const winsLossEl = document.querySelector('#wins-losses');
const 

//--------event listeners-------------
document.querySelector('#play-again').addEventListener('click', init)
document.querySelector('#place-bet').addEventListener('click', placeBet)
document.querySelector('#hit').addEventListener('click', init)
document.querySelector('#stand').addEventListener('click', init)
document.querySelector('#bet-one').addEventListener('click', increaseBetOne)
document.querySelector('#bet-three').addEventListener('click', increaseBetThree)
document.querySelector('#next-hand').addEventListener('click', init)

//--------Initialize the Game---------
init();
//--------Functions-------------------
function init(){
    suits = ['s','c','d','h'];
    ranks = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
    originalDeck = buildOriginalDeck();
    amountBet = 0;
    wins = 0;
    losses = 0;
    playerBank = 10;
    shuffledDeck = getNewShuffle();
    render();
};

function buildOriginalDeck(){
    const deck = [];
    suits.forEach(function(suit){
        ranks.forEach(function(rank){
            deck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            });
        });
    });
    return deck;
};

function getNewShuffle(){
    const temporaryDeck = [...originalDeck];
    const newShuffled = [];
    let i;
    for(i=0; i<temporaryDeck.length; i++){
        //need a random index for a card in the deck
        const randIdx = Math.floor(Math.random() * temporaryDeck.length);
        //use splice to add cards and remove from temporary deck!
        newShuffled.push(temporaryDeck.splice(randIdx, 1)[0]);
    }
    return newShuffled;
}

function placeBet(){
    let checkBet = amountBet;
    if(checkBet > playerBank){
        alertEl.innerText('Bet is too high! Please bet lower!')
        amountBet = 0;
    }
}

function increaseBetOne(){
    amountBet += 1;
    console.log(amountBet)
    render();
}

function increaseBetThree(){
    amountBet += 3;
    console.log(amountBet)
    render();
}

//write function for if the player hits or stands
function hit(){

}

function stand(){

}
//render function
    //will need to update the cards on the table and the amount bet
function render(){
    document.querySelector('#player-bank').innerText = playerBank;
    document.querySelector('#bet-pool').innerText = amountBet;
}
//--------Code Explanation-----------

//1.
//2.
//3.
//4.