/*
 * Create a list that holds all of your cards
 */
const pictures = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];
let cards = [];

let openedCards = [];
let matchedCards = [];

const cardsContainer = document.querySelector(".deck");
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

timerContainer.innerHTML = totalSeconds;

/*
 * Timer [ Start ] 
 */
function startTimer() {

    // Start Incrementer
    liveTimer = setInterval(function() {

        // Add totalTime by 1
        totalSeconds++;

        // Update the HTML
        timerContainer.innerHTML = totalSeconds;

    }, 1000);
    
}

// First Click
let isFirstClick = false;

// Start the game
function init() {
    const picturesShuffled = shuffle(pictures);
    for(let i = 0; i < pictures.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${pictures[i]}"></i>`;
        cardsContainer.appendChild(card);
    
        // Click event for each element
        click(card);
    }
}

// Event Listener
function click(card) {

    // Click Event
    card.addEventListener("click", function() {
        
        if(isFirstClick) {
            // Start timer
            startTimer();
            // Change value of First Click
            isFirstClick = false;
        }

        const currentCard = this;
        const previousCard = openedCards[0];

        // We have opened first opened card
        if(openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            // We compare 2 opened cards!
            compare(currentCard, previousCard);

        } else {
        // We don't have opened cards
            currentCard.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
        
    });
}

// Matching cards
function compare(currentCard, previousCard) {

    if(currentCard.innerHTML === previousCard.innerHTML) {
                
        // Cards matched
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

        // The game finished?
        isOver();

    } else {
        
        // Wait 1000ms then, do this!
        setTimeout(function() {
            currentCard.classList.remove("open", "show", "disable");
            previousCard.classList.remove("open", "show", "disable");
            
        }, 1000);

        openedCards = [];
        
    }

    // Add move
    addMove();

}

// Check if the game is finished
function isOver() {
    if(matchedCards.length === pictures.length) {
        alert("GAME COMPLETED!")

        // Stop timer
        stopTimer();
    }
}

// adding the moves to the game
const movesContainer = document.querySelector(".moves");
let moves = 0;
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Rating
    rating();
}

// Rating / Stars
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {

    if( moves < 12) {
        starsContainer.innerHTML = star + star + star;
    } else if( moves < 18) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}


// Restart the game
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() {
    timerDiv.textContent = '00:00';
    window.clearInterval(globalTimer);
    // Delete elements
    cardsContainer.innerHTML = "";

    // Create new cards
    init();

    // Reset
    matchedCards = [];
    moves = 0;
    movesContainer.innerHTML = moves;
    starsContainer.innerHTML = star + star + star;
    // Reset timer
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds;
});

// Start the game for first time
init();

shuffle(cards);

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
