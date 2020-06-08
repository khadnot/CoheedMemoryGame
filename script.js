const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COVERS = [
	{ name: "sstb", image:("https://i.ibb.co/25TMqFc/sstb.jpg")},
	{ name: "iksse3", image:("https://i.ibb.co/MVx4X2q/iksse3.jpg")},
	{ name: "good-apollo", image:("https://i.ibb.co/Jzk87cD/good-apollo.jpg")},
	{ name: "nwft", image:("https://i.ibb.co/xCCYtr4/nwft.jpg")},
	{ name: "black-rainbow", image:("https://i.ibb.co/YTXF4Cv/black-rainbow.jpg")},
	{ name: "descension", image: ("https://i.ibb.co/1n9mGxr/descension.jpg")},
	{ name: "sstb", image:("https://i.ibb.co/25TMqFc/sstb.jpg")},
	{ name: "iksse3", image:("https://i.ibb.co/MVx4X2q/iksse3.jpg")},
	{ name: "good-apollo", image:("https://i.ibb.co/Jzk87cD/good-apollo.jpg")},
	{ name: "nwft", image:("https://i.ibb.co/xCCYtr4/nwft.jpg")},
	{ name: "black-rainbow", image:("https://i.ibb.co/YTXF4Cv/black-rainbow.jpg")},
	{ name: "descension", image: ("https://i.ibb.co/1n9mGxr/descension.jpg")},
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want to research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledCovers = shuffle(COVERS);

// this function loops over the array of covers
// it creates a new div and gives it a class with the value of the cover
// it also adds an event listener for a click for each card
function createDivsForCovers(coverArray) {
  for (let cover of coverArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
	newDiv.classList.add(cover.name);
    newDiv.classList.add("hidden");
	

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(e) {
  if (noClicking) {
	  return;
  }
  if (e.target.classList.contains("flipped")) {
	  return;
  }

  console.log(e.target.classList[0]);
  console.log(e.target.className);

  let currentCard = e.target;
  currentCard.classList.remove("hidden");

  if (!card1 || !card2) {
	  currentCard.classList.add("flipped");
	  card1 = card1 || currentCard;
	  card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
	  noClicking = true;
	
	  let flip1 = card1.className;
	  let flip2 = card2.className;
	// check to see if flipped cards match
	  if (flip1 === flip2) {
		  cardsFlipped += 2;
		  card1.removeEventListener("click", handleCardClick);
		  card2.removeEventListener("click", handleCardClick);
		  card1 = null;
		  card2 = null;
		  noClicking = false;
	  } else {
		  setTimeout(function() {
			  card1.classList.add("hidden");
			  card2.classList.add("hidden");
			  card1.classList.remove('flipped');
			  card2.classList.remove('flipped');
			  card1 = null;
			  card2 = null; 
			  noClicking = false;
		  }, 1000);
	  }
  }
  if (cardsFlipped === COVERS.length) {
	  setTimeout(function() {
		  alert('Game Over!');
	  }, 200);
  }
}
// restart game
let restart = document.getElementById("restart");
restart.addEventListener('click', function() {
	location.reload();
});
// when the DOM loads
createDivsForCovers(shuffledCovers);
