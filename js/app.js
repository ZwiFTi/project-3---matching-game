// TODO: En stopper, slik at man ikke kan velge mer enn to kort
// TODO: Clicks should only be recorded when users clicks a card
// TODO: Object-oriented functional


/*
 * Create a list that holds all of your cards
 */
const deckList = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
  "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"
];

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


let moves = 0;



/* logging the shuffle function for testing purposes */
console.log(shuffle(deckList));


/* loop through each card and create its HTML */

// Shuffles deck
function newBoard() {
  const newDeck = shuffle(deckList);

  // Laying out the list items from the shuffled deck
  for (var i = 0; i < 16; i++) {
    // Creating a brand new <li> element
    const newLi = document.createElement('li');

    // Adding the class "card" to the newly added <li> element
    newLi.classList.add("card");

    //storing the .deck parent
    const deckUl = document.querySelector('.deck');

    // and appending the added <li> element to deck parent
    deckUl.appendChild(newLi);


    const newI = document.createElement('i');
    newI.classList.add('fa', newDeck[i]);
    newLi.appendChild(newI);
  }
}

newBoard();



// listen to user clicking a hidden card
// flip the card on click
const hiddenCards = document.querySelector('.deck');
hiddenCards.addEventListener('click', function(event) {

  // only unhide cards if less than two is selected
  if (countSelected(allCards) <= 1) {
    func(event.target);
    simulate();
    updateMoves();
    updateStars();
    }
  else {
    // do nothing
  }

});


function func(element) {
  element.classList.add('open');
  element.classList.add('show');
}




// eventlistener to restart board

const restart = document.querySelector('.restart');

restart.addEventListener('click', function(event) {
  resetBoard();
  resetCount();

});








// matching logic //

const allCards = document.getElementsByClassName("card");






function matchingLogic(numberOfCards) {
  if (numberOfCards == 0) {
    console.log("please select more cards");
  }
  else if  (numberOfCards == 1) {
    console.log("please select more cards");
  }
  else {
    console.log("Does it match?");
    // Check if cards match
    // if match -> make them class "card match"
    // if not -> hide them again after a few seconds
  }
}






// function that updates how many selected cards user has
// input: all the list elements of deck
// returns how many cards are selected by user
function numberOfCards(allCards) {
  const cardSelected = [];
  const arrayLength = allCards.length;

  for (var i = 0; i < arrayLength; i++) {
    // open cards have a class length of 3
    if (allCards[i].classList.length == 3) {
      // push open card to list TODO: make this a simple count instead
          cardSelected.push(allCards[i])
        }
    }

  return cardSelected.length;
}

// function that checks if selected cards are identical
// input: all the list elements of deck
// output: true if identical, false if not
function isIdentical(allCards) {
  const cardSelected = [];
  const arrayLength = allCards.length;

  for (var i = 0; i < arrayLength; i++) {
    // open cards have a class length of 3
    if (allCards[i].classList.length == 3) {
      // push open card to list TODO: make this a simple count instead
          cardSelected.push(allCards[i])
        }
    }

    // if two cards are selected by user
    if (cardSelected[1] != undefined) {
      const cardA = cardSelected[0].querySelector('i');
      const cardB = cardSelected[1].querySelector('i');
      if (cardA.classList.toString() == cardB.classList.toString()) {
        return true;
      }
      else {
        return false;
      }
  }
  else {
    console.log("select more cards")
  }
}


// function that gets selected cards
function getSelected(allCards) {
  const cardSelected = [];
  const arrayLength = allCards.length;

  for (var i = 0; i < arrayLength; i++) {
    // open cards have a class length of 3
    if (allCards[i].classList.length == 3) {
      // push open card to list TODO: make this a simple count instead
          cardSelected.push(allCards[i])
        }
    }

    // if two cards are selected by user
    if (cardSelected[1] != undefined) {
      const cardA = cardSelected[0].querySelector('i');
      const cardB = cardSelected[1].querySelector('i');
      if (cardA.classList.toString() == cardB.classList.toString()) {
        return [cardA, cardB];
      }
      else {
        return [cardA, cardB];
      }
  }
  else {
    console.log("select more cards")
  }
}

function countSelected(allCards) {
  let count = 0;
  const arrayLength = allCards.length;

  for (var i = 0; i < arrayLength; i++) {
    // open cards have a class length of 3
    if (allCards[i].classList.length == 3) {
      // push open card to list TODO: make this a simple count instead
          count += 1;
        }
    else {
      count = count;
    }
    }

    return count;
}

isIdentical(allCards);
getSelected(allCards);
countSelected(allCards);


// function that makes the cards class="card match" IF they are identical
// if they are not, then it makes them hidden again (class="card")



    //Do something

// This function should include everything that has to be done
// when a user registrers a click
function simulate() {

  setTimeout(function(){
    if (isIdentical(allCards)) {
      a = getSelected(allCards)[0].parentNode
      b = getSelected(allCards)[1].parentNode

      a.classList.add("card");
      a.classList.add("match");
      b.classList.add("card");
      b.classList.add("match");

      // check if game is won
      moves += 1
      isGameWon();

    }
    else {
      a = getSelected(allCards)[0].parentNode
      b = getSelected(allCards)[1].parentNode
      a.className = "card";
      b.className = "card";
      moves += 1
    }
}, 1500);
  console.log(moves)
}


function isGameWon() {
  const matched = document.getElementsByClassName("card match");
  if (matched.length == 16) {
    console.log("You have won the fucking game");
    modal();
  }
  else {
    console.log("keep on playing");
  }
}

function updateMoves() {
  const movesElement = document.querySelector('.moves');
  movesElement.textContent = moves;
}


// functions to reset the game


function resetBoard () {
  const cards = document.querySelector('.deck');

  while (cards.querySelector('li')) {
    cards.querySelector('li').remove()
  }
  newBoard();
}

function resetMoves () {
  // TODO
}

function resetTimer () {
  // TODO
}

function removeElements() {
  const container = document.querySelector('.container');

  while (container.querySelector('section')) {
    container.querySelector('section').remove()
  }
  while (container.querySelector('ul')) {
    container.querySelector('ul').remove()
  }
}
// functions for winning the game

function modal() {
  const container = document.querySelector('.container');

  // change header
  // container.querySelector('h1').textContent = 'Congratulations! You won!';


  // remove game stuff
  while (container.querySelector('section')) {
    container.querySelector('section').remove()
  }
  while (container.querySelector('ul')) {
    container.querySelector('ul').remove()
  }

  // create a new div and <p> elements
  const newDiv = document.createElement('div');
  const newButton = document.createElement('button');

  // add div to container
  container.appendChild(newDiv);

  // add p to div
  const mainDiv = container.querySelector('div');
  mainDiv.className = "deck modal";


  // populate the div with winning information
  mainDiv.appendChild(newButton);

  // give button a bootstrap class
  mainDiv.querySelector('button').className = "btn-default"



  //TODO: APPEND ALL WINNING STUFF HERE!!
  mainDiv.querySelector('button').innerHTML = "PLAY AGAIN";


  const info = ["Congratulations!", "Do you want to play again?", "You finished in"];
  const arrayLength = info.length;
  console.log(arrayLength);
  for (var i = 0; i < arrayLength; i++) {
    console.log("wokring good")
    // Creating a brand new <li> element
    const newP = document.createElement('p');
    newP.classList.add("p-"+i);
    const divElement = document.querySelector('.deck');
    console.log(divElement);
    divElement.appendChild(newP);
    mainDiv.querySelector('.p-'+i).innerHTML = info[i];
  };

  mainDiv.querySelector('.p-'+2).insertAdjacentHTML('beforeend', " " + moves + " moves");

  //TODO: Listen to button press, then reset game

  const buttonElement = document.querySelector('button');

  buttonElement.addEventListener('click', function(event) {

    resetCount();
    resetElements();
    resetBoard();





    const hiddenCards = document.querySelector('.deck');
    hiddenCards.addEventListener('click', function(event) {

      // only unhide cards if less than two is selected
      if (countSelected(allCards) <= 1) {
        func(event.target);
        simulate();
        updateMoves();
        updateStars();
        }
      else {
        // do nothing
      }

    });
  });
}

function lessStar () {
  const starElement = document.querySelector('stars');
}

function removeStars () {
  const starElement = document.querySelector('.stars');
  console.log("should now be removing stars");
  starElement.removeChild('li');
  starElement.removeChild('li');
  starElement.removeChild('li');
}

function updateStars () {
  const starElement = document.querySelector('.stars');
  console.log("updating stars");
  removeStars();
  if (moves < 10) {


    const newLi = document.createElement('li');
    const newI = document.createElement('i');

    starElement.appendChild(newLi);
    starElement.querySelector('li').appendChild(newI)
    starElement.querySelector('i').className = "fa fa-star"
  } else if (moves < 15) {

  } else if (moves < 20) {

  } else {

  }

}

function resetCount() {
  const container = document.querySelector('.container');
  moves = 0;
  if (container.querySelector(".moves")) {
    container.querySelector(".moves").innerHTML = "0";
  }
}

function resetElements() {
  const container = document.querySelector('.container');

  while (container.querySelector('button')) {
    container.querySelector('button').remove()
  }
  while (container.querySelector('.p-0')) {
    container.querySelector('.p-0').remove()
  }
  while (container.querySelector('.p-1')) {
    container.querySelector('.p-1').remove()
  }
  while (container.querySelector('.p-2')) {
    container.querySelector('.p-2').remove()
  }
  while (container.querySelector('.deck.modal')) {
    container.querySelector('.deck.modal').remove();
  }
  // create a brand new <span> element
  addBackSection();
  const newUl = document.createElement('ul');
  newUl.className = "deck";

  // select the first (main) heading of the pag

  // add the the <span> element as the last child element of the main heading
  container.appendChild(newUl);
}


function addBackSection () {
  const container = document.querySelector('.container');

  const newSection = document.createElement('section');
  const newUl = document.createElement('ul');

  container.appendChild(newSection);
  container.querySelector('section').className = "score-panel";
  container.querySelector('section').appendChild(newUl)

  container.querySelector('section').querySelector('ul').className = "stars";


  /*

  <section class="score-panel">
    <ul class="stars">
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
      <li><i class="fa fa-star"></i></li>
    </ul>

    <span class="moves">0</span> Moves

    <div class="restart">
      <i class="fa fa-repeat"></i>
    </div>
  */
}

/*

    <div class="deck">
      <p>You finished the board in time : xxx </p>
      <p>You managed to get x stars </p>
      <p>Great job!</p>
    </div>
</div>

*/





/*
if (document.getElementsByClassName("card").classList == ["card", "open", "show"]) {
  // run this code
} else {
  // run this code
} */

// BACKCARD //
//<li class="card">
//    <i class="fa fa-diamond"></i>
//</li>


//<li class="card match">
//    <i class="fa fa-anchor"></i>
//</li>



// <li class="card open show">
//     <i class="fa fa-bolt"></i>
// </li>



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
