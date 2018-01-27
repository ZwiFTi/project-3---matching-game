// TODO: En stopper, slik at man ikke kan velge mer enn to kort
// TODO: Clicks should only be recorded when users clicks a card
// TODO: Object-oriented functional
// TODO: The moves are recorded at first click. It should be recorded after both clicks!


/*
 * Create a list that holds all of your cards
 */
const deckList = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
  "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
  "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"
];



var section = {
  starElement: document.querySelector('.stars'),
  liElement: document.querySelector('.stars').querySelector('li'),
  movesElement: document.querySelector('.moves'),

  moves: 0,

  /**
   * removeStars simply removes all child elements of <section><ul>
   * element. Ingame this function will remove all stars.
   */
  removeStars: function() {
    for (var i = 0; i < 10; i++) {
      if (section.starElement.querySelector('li')) {
        section.starElement.querySelector('li').remove();
      }
    }
  },

  /**
   * appendStars is a function that inputs the number
   * of stars the user wants to be added to <section> as
   * <li><i> elements that is childs of <ul>
   */
  appendStars: function(x) {
    for (var i = 0; i < x; i++) {
      console.log("loop number " + i)
      const newLi = document.createElement('li');
      section.starElement.appendChild(newLi);
      const newI = document.createElement('i');
      newI.classList.add('fa', 'fa-star');
      newLi.appendChild(newI);
      }
  },

  updateStars: function() {
    console.log("updating stars" + section.starElement);

    section.removeStars();
    console.log("moves = " + section.moves);
    if (section.moves < 10) {

      console.log("doing this shit")
      section.appendStars(3);
    } else if (section.moves < 15) {
      section.appendStars(2);
    } else if (section.moves < 20) {
      section.appendStars(1);
    } else {
      section.appendStars(0);
    }
  },

  /**
   * Returns the number of stars user currently has
   */
   getStars: function() {
     if (section.moves < 10) {
       return 3;
     } else if (section.moves < 15) {
       return 2;
     } else if (section.moves < 20) {
       return 1;
     } else {
       return 0;
     }
   },

   updateMoves: function () {
     // Passes in how many moves the player has made into
     // the span with class="moves".
     section.movesElement.textContent = section.moves;
   },

  resetMoves: function() {
     section.moves = 0;
   }
};


var deck = {
  deckList: ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-anchor", "fa-anchor", "fa-bolt", "fa-bolt", "fa-cube", "fa-cube", "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle", "fa-bomb", "fa-bomb"
  ],


  newBoard: function() {
    const newDeck = deck.shuffle(deck.deckList);

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
  },

  /*
   * Display the cards on the page
   *   - shuffle the list of cards using the provided "shuffle" method below
   *   - loop through each card and create its HTML
   *   - add each card's HTML to the page
   */

  // Shuffle function from http://stackoverflow.com/a/2450976
  shuffle: function(array) {
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
};



deck.newBoard();



// listen to user clicking a hidden card
// flip the card on click
const hiddenCards = document.querySelector('.deck');
hiddenCards.addEventListener('click', function(event) {

  // only unhide cards if less than two is selected
  if (countSelected(allCards) <= 1) {
    func(event.target);
    simulate();
    section.updateMoves();
    section.updateStars();
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
  section.resetMoves();

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
      section.moves += 1
      isGameWon();

    }
    else {
      a = getSelected(allCards)[0].parentNode
      b = getSelected(allCards)[1].parentNode
      a.className = "card";
      b.className = "card";
      section.moves += 1
    }
}, 1500);
  console.log(section.moves)
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

// functions to reset the game


function resetBoard () {
  const cards = document.querySelector('.deck');

  while (cards.querySelector('li')) {
    cards.querySelector('li').remove()
  }
  deck.newBoard();
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
  // Inputs how many stars the user has
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


  const info = ["Congratulations!", "Do you want to play again?", "You finished in", "You finished with " + section.getStars() + " stars!"];
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

  mainDiv.querySelector('.p-'+2).insertAdjacentHTML('beforeend', " " + section.moves + " moves");

  //TODO: Listen to button press, then reset game

  const buttonElement = document.querySelector('button');

  buttonElement.addEventListener('click', function(event) {

    resetCount();
    resetElements();
    resetBoard();
    section.resetMoves();





    const hiddenCards = document.querySelector('.deck');
    hiddenCards.addEventListener('click', function(event) {

      // only unhide cards if less than two is selected
      if (countSelected(allCards) <= 1) {
        func(event.target);
        simulate();
        section.updateMoves();
        section.updateStars();
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





function resetCount() {
  const container = document.querySelector('.container');
  section.moves = 0;
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
