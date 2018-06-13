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

// Set the default value to the timer's container
timerContainer.innerHTML = totalSeconds + 's';

/*
 * Timer [ Start ] 
 */
function startTimer() {

    // Start Incrementer
    liveTimer = setInterval(function() {

        // Add totalTime by 1
        totalSeconds++;

        // Update the HTML
        timerContainer.innerHTML = totalSeconds + 's';

    }, 1000);
    
}

// First Click
let isFirstClick = true;

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

        // If the game is finished display modal
        gameOverMessage();
    }
}

// Game Over Message Modal
function gameOverMessage() {

    // Display modal box
    modal.style.display = "block";

    // Select the Moves 
    const modalMoves = document.querySelector("#moves");
    // Change its value to the user moves
    modalMoves = moves;

    // Stop Timer
    stopTimer();
}

// Stop timer
function stopTimer() {
    clearInterval(incrementer);
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

    if( moves > 18) {
        starsContainer.innerHTML = star;
    } else if( moves > 12) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star + star + star;
    }
}




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


// Restart the game
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function() { 
    
    reset();

});

// Reset All Variables
function reset() {

    // Delete cards
    cardsContainer.innerHTML = "";

    // Create new cards
    init();

    // Empty the matchedcards
    matchedCards = [];

    // Reset moves
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset stars
    starsContainer.innerHTML = star + star + star;

    // Reset timer
    clearInterval(liveTimer);
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds;
}

// Start the game for first time
init();

shuffle(cards);
