/*
 * Create a list that holds all of your cards
 */

 let list = ['fa-diamon','fa-diamon','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];
 let cardFa = document.querySelectorAll('.card .fa')
 let deck = document.getElementsByClassName('deck');
 let card = document.querySelectorAll('.card');
 console.log(card);

 let cardArray = [...card];

 //any array for the cards that the user opens 
let openCards = [];
let matchedCards = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards() {
    this.classList.add('open');
    this.classList.add('show');
    this.classList.add('stop');
    openCards.push(this);
}

function pushing() {
    if (openCards.length == 2) {
        if (openCards[0].innerHTML != openCards[1].innerHTML) {
           unmatching();
        } else {
            matching();
        }
    }
}

function matching() {
    openCards[0].classList.toggle('match');
    //penCards[0].classList.add('open', 'show');
    openCards[1].classList.toggle('match'); 
//penCards[1].classList.add('open','show');
    matchedCards.push(openCards);
  openCards=[];
}

function unmatching() {
    setTimeout(function (){ 
    openCards[0].classList.remove('open', 'show');
    openCards[1].classList.remove('open', 'show');
    openCards[0].classList.remove('stop');
    openCards[1].classList.remove('stop');
   openCards=[];
    },1200);

}


for (let j = 0; j < cardArray.length; j++) {
    cardArray[j].addEventListener('click', displayCards);
    cardArray[j].addEventListener('click',pushing);
};
console.log(openCards);

//show errors to user
const displayErrors = (err) => {
    closeErrors();
    const errorMessage = '';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-div';
    errorDiv.innerHTML = errorMessage;
    scorePanel.parentNode.insertBefore(errorDiv, scorePanel.nextSibling);
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeErrors);
  }
  
  // removes the error message
  const closeErrors = () => {
    const errorDiv = document.querySelector('.error-div');
    errorDiv ? errorDiv.remove() : null;
  }



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
