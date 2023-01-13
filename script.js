/*
- Collez le code du challenge mini RPG

- Enlevez l'appel aux fonctions, on les appelera via les boutons

Exercice 1 :
Faites en sorte que les fonctions soient appelées quand on clique sur les boutons (vous pouvez regarder la console pour voir les appels fonctionner)

💡: Utilisez onClick=""

Exercice 2 : Créez une fonction updateLife() qui va mettre à jour nos barres de vie

💡: Utilisez document.querySelector (on va modifier le style, et le innerHTML)

Exercice 3 : Appelez cette fonction dans chacune de vos fonctions de jeu, de sorte à ce que les barres de vie se mettent à jour

Exercice 4 : go wild

Vous avez un _arsenal_ d'outils à disposition: des animations CSS, etc. Have fun !


*/
let playerLife = 100;
let enemyLife = 100;
const miniPotion = 10;
const maxiPotion = 30;

let nbMiniPotion = 3;
let nbMaxiPotion = 1;

let nbMiniEnemyPotion = 3;
let nbMaxiEnemyPotion = 1;

// Sélectionne element et les stock dans une variable
let playerStatus = document.getElementById("player_lives");
let enemyStatus = document.getElementById("enemy_lives");
let gamerAction = document.querySelector("p");
let buttonPlay = document.getElementById("play");

// selectionne buttons potions
let buttonSmallPotion = document.getElementById("small_potion");
let buttonBigPotion = document.getElementById("big_potion");
let buttonTakeBigPotion = document.getElementById("take_big_potion");
let buttonTakeSmallPotion = document.getElementById("take_small_potion");
// selectionne elements pour rendre visible la section winner en l'affichant instead of section actions
let sectionWinner = document.getElementById("winner");
let sectionActions = document.getElementById("actions");
let emojiWinner = document.getElementById("emoji_winner");

// let playAgain = document.getElementById("try_again");

/* ======================*/
/* = = = FONCTIONS = = = */
/* ======================*/

function logger(message) {
  gamerAction.textContent = message;
}

function startTheGame() {
  displayPlayerStatus();
  displayEnemyStatus();
  sectionActions.style.display = "block";
  if (playerLife === 100 && enemyLife === 100) {
    logger("READY TO START ?")
    startToFight();
  }
  else if (playerLife === 0 || enemyLife === 0) {
    logger("TRY AGAIN ?");
    sectionActions.style.display = "block";
    sectionWinner.style.visibility = "hidden";
    tryAgain();
    buttonPlay.style.opacity = 0.33;
  }
  rechargePotion();
  rechargeEnemyPotion();
}

function startToFight() {
  buttonPlay.style.opacity = 0.33;
  logger("FIGHT !!!");
}

function tryAgain() {
  playerLife = 100;
  enemyLife = 100;
  startTheGame();
  managePotionButton();
  manageEnemyPotionButton();
}

function displayPlayerStatus() {
  if (playerLife > 0) {
    playerStatus.innerHTML = playerLife;
    return "Player life is now at " + playerLife + " hp.";
  }
  else {
    playerLife = 0;
    playerStatus.textContent = "Game over";
    enemyStatus.textContent = "You win";
    resultOfGame();
    logger("TRY AGAIN ?");
    buttonPlay.style.opacity = 1;
    return "Game over (" + playerLife + " hp). Try again !";
  }
}

function displayEnemyStatus() {
  if (enemyLife > 0) {
    enemyStatus.innerHTML = enemyLife;
    return "Enemy life is now at " + enemyLife + " hp.";
  }
  else {
    enemyLife = 0;
    playerStatus.textContent = "You win";
    enemyStatus.textContent = "Game over";
    resultOfGame();
    logger("TRY AGAIN ?");
    buttonPlay.style.opacity = 1;
    return "Enemy is dead (" + enemyLife + " hp).";
  }
}

function resultOfGame() {
  sectionWinner.style.visibility = "visible";
  if (playerStatus.innerHTML == "You win") {
    emojiWinner.innerHTML = "🧙‍♀️"
  }
  if (enemyStatus.innerHTML == "You win") {
    emojiWinner.innerHTML = "👹"
  }
  sectionActions.style.display = "none";
}

function takePotion(p) {
  if (p === miniPotion && nbMiniPotion > 0) {
    playerLife += p;
    nbMiniPotion -= 1;
    console.log("Glup, taking mini potion ! His life is now at " + playerLife + " hp.");
    managePotionButton();
  }
  if (p === maxiPotion && nbMaxiPotion > 0) {
    playerLife += p;
    nbMaxiPotion -= 1;
    console.log("Glup, glup, glup taking maxi potion ! His life is now at " + playerLife + " hp.");
    managePotionButton();
  }
  displayPlayerStatus();
}



function managePotionButton() {
  if (nbMiniPotion === 0) {
    buttonSmallPotion.disabled = true;
  }
  else {
    buttonSmallPotion.disabled = false;
  }
  if (nbMaxiPotion === 0) {
    buttonBigPotion.disabled = true;
  }
  else {
    buttonBigPotion.disabled = false;
  }
}



function rechargePotion() {
  buttonSmallPotion.disabled = false;
  buttonBigPotion.disabled = false;
  nbMiniPotion = 3;
  nbMaxiPotion = 1;
}



function attackWithHands() {
  enemyLife -= 10;
  console.log("PUNCH !\n", displayEnemyStatus());
}

function attackWithSword() {
  enemyLife -= 20;
  console.log("SWING !\n", displayEnemyStatus());
}
// boule de feu: enlève la moitié de la vie de l'ennemi
function bouleDeFeu() {
  enemyLife = enemyLife / 2;
  console.log("FIREeee !\n", displayEnemyStatus());
}

function vol_de_vie() {
  if (enemyLife > 20) {
    playerLife += 5;
    enemyLife -= 5;
  }
  console.log("Bingo !\n Enemy vous offre 5 hp " + displayPlayerStatus());
  displayPlayerStatus();
  displayEnemyStatus();
}



// Créez une fonction comboAttack(nbHits), qui donne nbHits coups de poings.
function comboAttack(nbHits) {
  console.log("COMBO ATTACK X" + nbHits);
  for (nbHits = 0; nbHits < 3; nbHits++) {
    attackWithHands();
  }
}

// la prochaine attaque fait +5 dégâts
function boostAttack(typeAttack) {
  enemyLife -= 5;
  if (typeAttack === "hands") {
    console.log("BOOM !\n the damage is boost,\n");
    attackWithHands();
  }
  if (typeAttack === "sword") {
    console.log("BOOM !\n the damage was been bigger, Enemy lost 5 lives in plus: ");
    attackWithSword();
  }
}

// FUNCTION ENEMY___________________________________________
function enemyAttack() {
  playerLife -= 40;
  displayPlayerStatus();
  console.log("Enemy attacked !!!\n Player's life is now at " + playerLife + " hp.");
}

function takeEnemyPotion(p) {
  if (p === miniPotion && nbMiniEnemyPotion > 0) {
    enemyLife += p;
    nbMiniEnemyPotion -= 1;
    console.log("Glup, taking mini potion ! Enemy life is now at " + enemyLife + " hp.");
    manageEnemyPotionButton();
  }
  if (p === maxiPotion && nbMaxiEnemyPotion > 0) {
    enemyLife += p;
    nbMaxiEnemyPotion -= 1;
    console.log("Glup, glup, glup taking maxi potion ! Enemy life is now at " + enemyLife + " hp.");
    manageEnemyPotionButton();
  }
  displayEnemyStatus();
}

function manageEnemyPotionButton() {
  if (nbMiniEnemyPotion === 0) {
    buttonTakeSmallPotion.disabled = true;
  }
  else {
    buttonTakeSmallPotion.disabled = false;
  }
  if (nbMaxiEnemyPotion === 0) {
    buttonTakeBigPotion.disabled = true;
  }
  else {
    buttonTakeBigPotion.disabled = false;
  }
}

function rechargeEnemyPotion() {
  buttonTakeSmallPotion.disabled = false;
  buttonTakeBigPotion.disabled = false;
  nbMiniEnemyPotion = 3;
  nbMaxiEnemyPotion = 1;
}

// displayPlayerStatus();
// displayEnemyStatus();
// startTheGame();

/* ======================*/
/* = = = PROGRAMME = = = */
/* ======================*/
// attackWithHands();
// attackWithSword();
// enemyAttack();
// takePotion(miniPotion);
// comboAttack(3);
// vol_de_vie()
// attackWithSword();
// bouleDeFeu();
// boostAttack('sword');
// enemyAttack();
// takePotion(maxiPotion);
// enemyAttack();
// takePotion(miniPotion);
// takePotion(miniPotion);


// if (nbMiniPotion != 0) {
//   console.log("you have " + nbMiniPotion + " mini potion(s)");
// }
// if (nbMaxiPotion != 0) {
//   console.log("you have " + nbMaxiPotion + " maxi potion(s)");
// }
// if (nbMaxiPotion === 0 || nbMiniPotion === 0) {
//   buttonSmallPotion.style.opacity = 0.33;
//   console.log("Oups no more potion")
// }


// if (playerLife <= 0) {
  //   playerLife = 0;
  //   console.log("Player is fall, you lose...\n Try again");
  // }






