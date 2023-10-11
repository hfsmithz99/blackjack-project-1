//--------Constant Variables----------

//set Constant variables
//Number of cars in deck

//--------State Variables-------------
//cards in hand
let playerHandCards;
let compueterHandCards;
//players money pot
let playerBank;
//amount for bet
let amountBet = 0;

let shuffledDeck;

let suits;
let ranks;

let originalDeck;

let winTF;
let continueTF;


//--------Cached DOM Elements---------
//cache the buttons
    //play again
const playAgainBtn = document.querySelector('#play-again');
    //bet 1 or 5
const placeBetBtn = document.querySelector('#place-bet')
 const betOneBtn = document.querySelector('#bet-one');
const betThreeBtn = document.querySelector('#bet-three');
 //stand
const standBtn = document.querySelector('#stand');
//hit
const hitBtn = document.querySelector('#hit');
//cache the elements of DOM that need to be updated by render()
    //amount bet
    //cards in hand

 const alertEl = document.querySelector('#alert');
const playerBankEl = document.querySelector('#player-bank');
const rulesBoxEl = document.querySelector('#rules-box');
const betPoolEl = document.querySelector('#bet-pool');
const playerHandValEl = document.querySelector('#player-card-values')
const computerHandValEl = document.querySelector('#computer-card-values')

const computerContainerEl = document.querySelector('#computer-cards');
const playerContainerEl = document.querySelector('#player-cards');

//--------event listeners-------------
document.querySelector('#play-again').addEventListener('click', init)
document.querySelector('#place-bet').addEventListener('click', placeBet)
document.querySelector('#bet-one').addEventListener('click', increaseBetOne)
document.querySelector('#bet-three').addEventListener('click', increaseBetThree)
document.querySelector('#stand').addEventListener('click', stand)
document.querySelector('#hit').addEventListener('click', playerHit)
document.querySelector('#next-hand').addEventListener('click', nextHand)

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
    playerHandCards = deal()
    compueterHandCards = deal();
    continueTF = true;
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
        alertEl.innerText = 'Bet is too high! Please bet lower!'
        amountBet = 0;
    } else return true;

}


//INCREASE BET FUNCTIONS
//
function increaseBetOne(){
    amountBet += 1;
    playerBank -= 1;
    console.log(amountBet)
    render();
}

function increaseBetThree(){
    amountBet += 3;
    playerBank -= 3;
    console.log(amountBet)
    render();
}


//calling hits the players hand
function playerHit(){
    let randomIndexForDeal = Math.floor(Math.random() * shuffledDeck.length);
    playerHandCards.push(shuffledDeck.splice(randomIndexForDeal, 1)[0]);
    console.log(playerHandCards)
    render();
}

//calling hits the computer hand
function computerHit() {
    let randomIndexForDeal = Math.floor(Math.random() * shuffledDeck.length);
    compueterHandCards.push(shuffledDeck.splice(randomIndexForDeal, 1)[0]);
    console.log(compueterHandCards);
    render()
}

function stand(){
    while(sumValueCards(compueterHandCards) <= 16){
        computerHit();
    }
    continueTF = false;
    if(sumValueCards(playerHandCards) > 21){
        winTF = false;
      console.log('isworking')
    } else if (sumValueCards(playerHandCards) > sumValueCards(compueterHandCards)){
        winTF = true;
        console.log('isworking')
    } else if (sumValueCards(playerHandCards) === sumValueCards(compueterHandCards)){
        winTF = false;
        console.log('isworking')
    } else if (sumValueCards(compueterHandCards) > 21){
        winTF = true;
    } else winTF = false;
    console.log(continueTF)    
    console.log(winTF) 
    if (winTF = true){
        playerBank += (amountBet*2);
    } else amountBet = 0;
    render();
}

function sumValueCards(arr){
    let sumOfCardValue = 0;
    for(i=0; i<arr.length; i++){
        sumOfCardValue += arr[i].value;
    }

    return sumOfCardValue;
}

function deal(){
    let twoCards = [];
    if(shuffledDeck.length === 0){
        shuffledDeck = getNewShuffle();
    } else {
    for(i=0; i < 2; i++){
        let randomIndexForDeal = Math.floor(Math.random() * shuffledDeck.length);
        twoCards.push(shuffledDeck.splice(randomIndexForDeal, 1)[0]);
    }
    }
    return twoCards;
}


function renderCompCardsInContainer(deck, container){
    container.innerHTML = '';
    let cardsHTML = '';
    deck.forEach(function(card){
        cardsHTML += `<div id="computer-cards" class="card ${card.face}"></div>`;
    })
    container.innerHTML = cardsHTML;
}

function renderPlayerCardsInContainer(deck, container){
    container.innerHTML = '';
    let cardsHTML = '';
    deck.forEach(function(card){
        cardsHTML += `<div id="player-cards" class="card ${card.face}"></div>`;
    })
    container.innerHTML = cardsHTML;
}

function nextHand(){
    playerHandCards = deal()
    compueterHandCards = deal();
    continueTF = true;

    render();
}

//render function
    //will need to update the cards on the table and the amount bet
    //move win condition to seperate function
function render(){
    playerBankEl.innerText = playerBank;
    betPoolEl.innerText = amountBet;
    playerHandValEl.innerText = sumValueCards(playerHandCards);
    computerHandValEl.innerText = sumValueCards(compueterHandCards);
    alertEl.innerText = ''
    renderCompCardsInContainer(compueterHandCards, computerContainerEl);
    renderPlayerCardsInContainer(playerHandCards, playerContainerEl);

    if((continueTF === false) && (winTF === true)){
        alertEl.innerText = "You win this hand! Time to play the next!";
        playerBank += amountBet;
        amountBet = 0;
    } else if ((continueTF === false) && (winTF === false)){
        alertEl.innerText = "You lost this hand.... Time to play the next!";
        amountBet = 0;
    } else return;

}
//--------Code Explanation-----------

//1.
//2.
//3.
//4.