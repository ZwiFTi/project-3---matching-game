/**
* @description Represent the section element from index.html. All operations,
* methods, and properties that is included or performed on this element and its
* child elements are included in this object.
* @constructor
*/
const section = {
  sectionElement: document.querySelector('.score-panel'),
  starElement: document.querySelector('.stars'),
  liElement: document.querySelector('.stars').querySelector('li'),
  movesElement: document.querySelector('.moves'),
  restartElement: document.querySelector('.restart'),
  moves: 0,

  /**
  * @description Removes all child elements (or stars ingame) from
  * the ul element with classname of stars.
  */
  removeStars: function() {
    for (let i = 0; i < 4; i++) {
      if (section.starElement.querySelector('li')) {
        section.starElement.querySelector('li').remove();
      }
    }
  },

  /**
  * @description Adds stars to section, ul
  * @param {string} x - Number of stars to be added to -ul-
  */
  appendStars: function(x) {
    for (let i = 0; i < x; i++) {
      const newLi = document.createElement('li');
      section.starElement.appendChild(newLi);
      const newI = document.createElement('i');
      newI.classList.add('fa', 'fa-star');
      newLi.appendChild(newI);
    }
  },

  /**
  * @description Update or refreshes the game with stars based on
  * how many moves the player has made.
  */
  updateStars: function() {
    section.removeStars();
    if (section.moves < 10) {
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
  * @description A method that gets how many stars the player currently is at
  * based on how many moves she/he has made.
  * @returns {number} Either 3, 2, 1 or 0 stars
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


  /**
  * @description Creates a new span element with classname of moves
  */
  createSpan: function() {
    const newSpan = document.createElement('span');
    section.sectionElement.appendChild(newSpan);
    newSpan.classList.add('moves');

    // update the element
    section.movesElement = document.querySelector('.moves');
  },


  /**
  * @description Creates a div with a classname of 'restart' and a child i
  * with a classname of 'fa fa-repeat'
  */
  createRestart: function() {
    const newDiv = document.createElement('div');
    section.sectionElement.appendChild(newDiv);
    newDiv.classList.add('restart');

    const newI = document.createElement('i');
    newDiv.appendChild(newI);
    newI.classList.add('fa', 'fa-repeat');
  },


  /**
  * @description Resets the number of moves a player has made.
  */
  resetMoves: function() {
    section.moves = 0;
  },

  /**
  * @description Updates the text inside the span with class="moves"
  * to be equal to the number of moves the player has made in the game
  */
  updateMoves: function() {
    if (section.movesElement) {
      section.movesElement.innerHTML = section.moves + " Moves";
    }
  },
};

/**
* @description Represent the ul element with classname "deck from index.html.
* All operations, methods, and properties that is included or performed on
* this element and its child elements are included in this object.
* @constructor
*/
const deck = {
  deckList: ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
  'fa-anchor', 'fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
  'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb'
],
ulElement: document.querySelector('.deck'),
allCards: document.getElementsByClassName('card'),
matchedCards: document.getElementsByClassName('card match'),
startTime: 0,
endTime: 0,


/**
* @description Laying out the list items from the shuffled deck
*/
newBoard: function() {
  const newDeck = deck.shuffle(deck.deckList);


  for (let i = 0; i < 16; i++) {
    // Creating a brand new <li> element
    const newLi = document.createElement('li');

    // Adding the class "card" to the newly added <li> element
    newLi.classList.add('card');

    //storing the .deck parent
    const deckUl = document.querySelector('.deck');

    // and appending the added <li> element to deck parent
    deckUl.appendChild(newLi);

    const newI = document.createElement('i');
    newI.classList.add('fa', newDeck[i]);
    newLi.appendChild(newI);
  }
},


/**
* @description Counts how many cards the player has selected / open
*/
countSelected: function() {
  let count = 0;
  const arrayLength = deck.allCards.length;

  for (let i = 0; i < arrayLength; i++) {
    // open cards have a class length of 3
    if (deck.allCards[i].classList.length == 3) {
      count += 1;
    }
    else {
      count = count;
    }
  }
  return count;
},


/**
* @description method that gets players selected cards. The method is used
* to check if player has selected two cards
* @returns {array} with card A and card B
*/
getSelected: function() {
  const cardSelected = [];
  const arrayLength = deck.allCards.length;

  for (let i = 0; i < arrayLength; i++) {
    // open cards have a class length of 3
    if (deck.allCards[i].classList.length == 3) {
      // push open card to list TODO: make this a simple count instead
      cardSelected.push(deck.allCards[i])
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
    // nothing
  }
},


/**
* @description function that checks if the players selected cards are identical
* @returns {boolean} true if identical, false if not
*/
isIdentical: function() {
  const cardSelected = [];
  const arrayLength = deck.allCards.length;

  for (let i = 0; i < arrayLength; i++) {
    // open cards have a class length of 3
    if (deck.allCards[i].classList.length == 3) {
      // push open card to list TODO: make this a simple count instead
      cardSelected.push(deck.allCards[i])
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
    // nothing
  }
},


/**
* @description Shuffles elements in an array
* @returns {array} true if identical, false if not
* Shuffle function from http://stackoverflow.com/a/2450976
*/
shuffle: function(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
},

/**
* @description Erases all cards
*/
erase: function() {
  while (deck.ulElement.querySelector('li')) {
    deck.ulElement.querySelector('li').remove()
  }
  deck.newBoard();
},

/**
* @description Checks if all cards are matched (if matched = win)
* @returns {boolean} true if all cards match, false if not
*/
isGameWon: function() {
  if (deck.matchedCards.length == 16) {
    deck.endTime = performance.now();
    console.log(deck.endTime);
    return true;
  }
  else {
    return false;
  }
},


/**
* @description Simply resets the timer of the game
*/
resetTime: function() {
  deck.startTime = 0;
  deck.endTime = 0;
}
};


// GAME RELATED STUFF //
deck.newBoard();

// listen to user clicking a hidden card
// flip the card on click
deck.ulElement.addEventListener('click', function(event) {
  // only unhide cards if less than two is selected
  if (section.moves == 0) {
    deck.startTime = performance.now();
    console.log(deck.startTime)
  }

  console.log(deck.allCards);
  if (deck.countSelected() <= 1) {
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
section.restartElement.addEventListener('click', function(event) {
  deck.erase();
  section.resetMoves();
  section.updateMoves();
});


deck.isIdentical();
deck.getSelected();
deck.countSelected();


/**
* @description Represents everything that has to be done
* when a user registrers a click
*/
function simulate() {
  setTimeout(function(){
    if (deck.isIdentical()) {
      a = deck.getSelected()[0].parentNode
      b = deck.getSelected()[1].parentNode

      a.classList.add('card');
      a.classList.add('match');
      b.classList.add('card');
      b.classList.add('match');

      // check if game is won, and present a modal if it is
      section.moves += 1
      if (deck.isGameWon()) {
        modal();
      }

    }
    else {
      a = deck.getSelected()[0].parentNode
      b = deck.getSelected()[1].parentNode
      a.className = 'card';
      b.className = 'card';
      section.moves += 1
    }
  }, 1500);
}

// WINNING GAME CONDITIONS //

/**
* @description Displaying a modal
*/
function modal() {
  const container = document.querySelector('.container');

  // remove elements thats not needed
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
  mainDiv.className = 'deck modal';


  // populate the div with winning information
  mainDiv.appendChild(newButton);

  // give button a bootstrap class
  mainDiv.querySelector('button').className = 'btn-default'
  mainDiv.querySelector('button').innerHTML = 'PLAY AGAIN';


  const info = ['Congratulations!',
  'You finished with ' + section.getStars() +
  ' star(s) and took ' + timeConversion((deck.endTime-deck.startTime)) + ' to complete.' +
  'It took ' + section.moves + ' moves to complete!'];
  const arrayLength = info.length;
  for (let i = 0; i < arrayLength; i++) {
    // Creating a brand new <li> element
    const newP = document.createElement('p');
    newP.classList.add('p-'+i);
    const divElement = document.querySelector('.deck');
    console.log(divElement);
    divElement.appendChild(newP);
    mainDiv.querySelector('.p-'+i).innerHTML = info[i];
  };

  const buttonElement = document.querySelector('button');

  buttonElement.addEventListener('click', function(event) {

    resetElements();
    deck.erase();
    section.resetMoves();
    section.updateMoves();
    deck.resetTime();


    //reset ULelement
    deck.ulElement = document.querySelector('.deck');

    deck.ulElement.addEventListener('click', function(event) {
      // only unhide cards if less than two is selected
      if (deck.countSelected() <= 1) {
        func(event.target);
        simulate();
        section.updateMoves();
        section.updateStars();
        if (section.moves == 0) {
          deck.startTime = performance.now();
        }
      }
      else {
        // do nothing
      }

    });
  });
}



/**
* @description Used to wipe out the modal to get a clean new game
*/
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
  newUl.className = 'deck';

  // select the first (main) heading of the pag
  // add the the <span> element as the last child element of the main heading
  container.appendChild(newUl);
}

/**
* @description Used to add back stuff to game after winning
*/
function addBackSection () {
  const container = document.querySelector('.container');

  const newSection = document.createElement('section');
  const newUl = document.createElement('ul');

  container.appendChild(newSection);
  container.querySelector('section').className = 'score-panel';
  container.querySelector('section').appendChild(newUl)

  container.querySelector('section').querySelector('ul').className = 'stars';

  section.resetMoves();

  // have to reset the starElement variable, otherwise function wont work
  section.starElement = document.querySelector('.stars');
  section.sectionElement = document.querySelector('.score-panel');

  // Refresh the section element
  section.updateStars()
  section.createSpan()
  section.createRestart()
  section.updateMoves()
}

/**
* @description Converts milliseconds to a human readable format'
* @returns {string} 10 Sec, 10 Min, 10 Hrs or 10 Days.
* from: https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
*/
function timeConversion(millisec) {
  const seconds = (millisec / 1000).toFixed(1);
  const minutes = (millisec / (1000 * 60)).toFixed(1);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + ' Sec';
  } else if (minutes < 60) {
    return minutes + ' Min';
  } else if (hours < 24) {
    return hours + ' Hrs';
  } else {
    return days + ' Days'
  }
}
