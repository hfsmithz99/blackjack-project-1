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
let amountBet;

let shuffledDeck;

const suits;
const ranks;

const originalDeck;


//--------Cached DOM Elements---------
//cache the buttons
    //play again
const playAgainBtn = document.querySelector('#play-again');
    //bet 1 or 5
const betOneBtn = document.querySelector('#bet-one');
const betFiveBtn = document.querySelector('#bet-five');
const placeBetBtn = document.querySelector('#place-bet')
    //stand
const standBtn = document.querySelector('#stand');
    //hit
const hitBtn = document.querySelector('#hit');
//cache the elements of DOM that need to be updated by render()
    //amount bet
    //cards in hand

//--------Initialize the Game---------
init();
//--------Functions-------------------
function init() {
suits = ['s','c','d','h'];
ranks = ['02','03','04','05','06','07','08','09','10','J','Q','K','A'];
originalDeck = buildOriginalDeck();

}

buildOriginalDeck (){
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
}

function getNewShuffle(){
    const temporaryDeck = [...originalDeck];
    const newShuffled = [];
    let i;
    while(i = 0; i<temporaryDeck.length; i++){
        //need a random index for a card in the deck
        const randIdx = Math.floor(Math.random() * temporaryDeck.length);
        //use splice to add cards and remove from temporary deck!
        newShuffled.push(temporaryDeck.splice(randIdx, 1)[0]);
    }
    return newShuffled;
}




//write function for if the player hits or stands
//render function
    //will need to update the cards on the table and the amount bet

//--------Code Explanation-----------

//1.
//2.
//3.
//4.