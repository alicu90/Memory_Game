/*
 * Create a list that holds all of your cards
 */

 const list = ['fa-diamon','fa-diamon','fa-paper-plane-o','fa-paper-plane-o','fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube','fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];
 const deck = document.querySelector('.deck');
 const cards = document.querySelectorAll('.card');


 //any array for the cards that the user opens 
let openedCards = [];
let previousOpenedCard = null;
let matchedCards = [];
console.log(list);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// call the function which create the deck
createDeck();

// function declaration that shuffles the icon cards and places them in the DOM in random order
function createDeck() {
    const fragment = document.createDocumentFragment();

    let shuffledList = shuffle(list);

    // create <li> and <i> DOM elements
    for(icon of shuffledList) {
        // create new <li> element
        const newlistItem = document.createElement('li');
        newlistItem.className = "card";
        // create new <i> element
        const cardIconItem = document.createElement('i');
        cardIconItem.className = card;
        // append <i> element to the <li> element
        listItem.appendChild(cardIconItem);
        // append <li> element to the Deck
        deck.appendChild(listItem);
    }
}

// add event listener to cards
deck.addEventListener('click', function(evt) {
    // check the target if it is <li> element
    if (evt.target.nodeName === 'li') {
        // check that the card is not already matched
        if (!evt.target.classList.contains("match")) {
            if (openedCards.length < 2) {
                if(previousOpenedCard === null) {
                    previousOpenedCard = evt.target;
                    openCards(evt);
                    check(evt);
                }
                // open cards if the previously one is not opened
                if (previousOpenedCard != evt.target) {
                    previousOpenedCard = null;
                    openCards(evt);
                    check(evt);
                }
            }
        }
    }
});

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

function openCards(x) {
    x.target.classList.add("open");
    const clickedCardIconClass = x.target.childNodes[0].getAttribute("class");
    openedCards.push(clickedCardIconClass);
}

// check if cards match
function check (x) {
    if (openedCards.length == 2) {
        let cardOpen = document.querySelectorAll('.open');
        cardOpen[0].classList.add("match");
        cardOpen[1].classList.add('match');
        cardOpen[0].classList.remove("open");
        cardOpen[1].classList.remove("open");
        openedCards.splice(0, 2);
    } else {
        let cardOpen = document.querySelectorAll('.open');
        cardOpen[0].classList.add("no_match");
        cardOpen[1].classList.add("no_match");
        setTimeout(function() {
            cardOpen[0].classList.remove("open", "no_match");
            cardOpen[1].classList.remove("open", "no_match");
            openedCards.splice(0, 2);
        }, 1000);
    }
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