"use strict";

var mainHealthPoints = 0;
var mainAttackPower = 0;
var mainAttackPowerIncrement = 0;

var mainCharacterIsSelected = false;

var defenderIsSelected = false;
var gameIsOver = false;
var defenderCounterAttackPower = 0;
var defenderHealthPoints = 0;
var attackButtonIsEnabled = 0;
var numberOfEnemiesToDefeat = 3;
var chosenCharacterID = " ";

//creating objects for each of the characters:

var firstCharacter = {
  name: "firstCharacter",
  healthPoints: 120,
  attackPower: 8,
  counterAttackPower: 10
};
var secondCharacter = {
  name: "secondCharacter",
  healthPoints: 110,
  attackPower: 10,
  counterAttackPower: 25
};
var thirdCharacter = {
  name: "thirdCharacter",
  healthPoints: 125,
  attackPower: 10,
  counterAttackPower: 10
};
var fourthCharacter = {
  name: "fourthCharacter",
  healthPoints: 120,
  attackPower: 6,
  counterAttackPower: 25
};

var characterArray = [
  firstCharacter,
  secondCharacter,
  thirdCharacter,
  fourthCharacter
];

$(".selectAPlayer").on("click", function() {
  if (mainCharacterIsSelected == false) {
    //unhide your character container
    $("#yourCharacter").removeClass("hidden");
    $(".enemiesAvailableContainer").removeClass("hidden");
    //code for moving characters around
    var chosenCharacter = $(this).removeClass("selectAPlayer");
    chosenCharacterID = $(this).attr("id");

    chosenCharacter.attr("class", "chosenCharacter");
    $(".yourCharacterContainer").append(chosenCharacter);
    mainCharacterIsSelected = true;
    var chosenEnemies = $(".selectAPlayer");
    chosenEnemies.attr("class", "enemy");
    $(".enemiesAvailableContainer").append(chosenEnemies);
    $("#instructionText").text("Now pick an enemy to battle.");
    $(".characterOptions").attr("class", "hidden");

    //code for adjusting main character health points and attack power based on which character is chosen.

    for (var i = 0; i < characterArray.length; i++) {
      if (characterArray[i].name == chosenCharacterID) {
        mainHealthPoints = characterArray[i].healthPoints;
        mainAttackPower = characterArray[i].attackPower;
        mainAttackPowerIncrement = characterArray[i].attackPower;
      }
    }
  } else if (
    mainCharacterIsSelected == true &&
    defenderIsSelected == false &&
    $(this).attr("id") !== chosenCharacterID
  ) {
    $("#attackButton").removeClass("hidden");
    $("#opponentContainer").removeClass("hidden");

    var chosenDefender = $(this).attr("class", "currentDefender");
    var chosenDefenderID = $(this).attr("id");

    $(".defenderContainer").append(chosenDefender);
    defenderIsSelected = true;

    //Setting defender health and attack points etc.

    for (var d = 0; d < characterArray.length; d++) {
      if (characterArray[d].name == chosenDefenderID) {
        defenderHealthPoints = characterArray[d].healthPoints;
        defenderCounterAttackPower = characterArray[d].counterAttackPower;
        $("#instructionText").text(
          "Now click the attack button to do battle with your opponent"
        );
      }
    }
  } else {
    alert(
      "That's not a valid click at the moment. Follow the instruction text to figure out your next move."
    );
  }
});

//Dealing with the attack button

$("#attackButton").on("click", function() {
  //setting up the first attack
  if (mainCharacterIsSelected == true && defenderIsSelected == true) {
    defenderHealthPoints = defenderHealthPoints - mainAttackPower;
    mainAttackPower = mainAttackPower + mainAttackPowerIncrement;
    //grab defender character health points

    $(".defenderContainer")
      .find(".characterHealth")
      .text(defenderHealthPoints);

    //setting up the counter attack if the defender still has health points

    if (defenderHealthPoints > 0) {
      mainHealthPoints = mainHealthPoints - defenderCounterAttackPower;

      $(".yourCharacterContainer")
        .find(".characterHealth")
        .text(mainHealthPoints);
      $("#instructionText").text(
        "You attacked your opponent for " +
          (mainAttackPower - mainAttackPowerIncrement) +
          " points.Your opponent then counter-attacked you for " +
          defenderCounterAttackPower +
          " points"
      );

      //seeing if the defender has killed the main character

      if (mainHealthPoints < 1) {
        mainHealthPoints = 0;
        $(".yourCharacterContainer")
          .find(".characterHealth")
          .text(mainHealthPoints);
        $("#no-audio")[0].play();
        alert("You're toast! Press restart to try again");

        $("#restart").removeClass("hidden");
        $("#attackButton").attr("class", "hidden");
        $("#instructionText").text("You lost! Press restart to try again");
        //code to make the restart button unhiddden
      }
    } else {
      //if the defender is killed

      $("#instructionText").text(
        "You attacked your opponent for " +
          mainAttackPower +
          " points and defeated your opponent! Now pick another one."
      );
      defenderIsSelected = false;
      $(".currentDefender").attr("class", "hidden");
      numberOfEnemiesToDefeat = numberOfEnemiesToDefeat - 1;
      //Win condition!
      if (numberOfEnemiesToDefeat < 1) {
        alert("You won! Press restart to play again!");
        $("#restart").removeClass("hidden");
        $("#attackButton").attr("class", "hidden");

        //This audio is just me singing the theme song.
        $("#yes-audio")[0].play();

        $("#instructionText").text("You won! Now press restart to play again");
      }
    }
  }
});

$("#restart").on("click", function() {
  location.reload();
});

// document.getElementById("attackButton").onclick = function() {

//     // (mainCharacterIsSelected == true && defenderIsSelected == false)
//     alert("button was clicked");
//  }​;

// $(".enemy").on("click", function() {
//   if (defenderIsSelected == false) {
//     var chosenDefender = $(this).removeClass("enemy");
//     chosenDefender.attr("class", "currentDefender");
//     $(".defenderContainer").append(chosenDefender);
//     defenderIsSelected = true;
//   } else {
//     alert("You've already chosen an enemy--finish this battle");
//   }
// });

// One--pick a player to begin
//      Once they pick a player:
// move images out of the main player and down into the potential enemies row (change background colors)
// var mainHealthPoints = player.healthPoints
// mainAttackPower = player.AttackPower
// mainCharacterisSelected=true;
// mainPowerIncrement=player.AttackPower
//  Now prompt them to pick a defender
//          Once they pick a defender:
// Move defender image into defender area
// var CounterAttackPower = defender.counterAttackPower
//var defenderHealthPoints = defender.healthPoints
//enable the attack button;

// When attack button is pressed
// defenderHealthPoints=DefenderHealthPoints-MainAttackPower
// if (defenderHealthPoints > 0) {mainHealthPoints = mainHealthPoints-defenderCounterAttackPower  mainAttackPower=mainAttackPower + mainAttackPowerIncrement}
// else {change class of defender to "defeated" which should move him into the "defeated" category)
// numberofEnemiesToDefeat = numberofEnemiesToDefeat - 1,
//      if (numberofEnemiesToDefeat> 0){
// defenderIsSelected = false}
// Display a "select a new opponent" text--maybe have some instructional text variable
// prompt them to pick a new defender and repeat the defender loop}
// else (number of defenders is 0)
//gameIsOver = true;
// display "You won" and encourage players to restart the game
//
// d
// decodeURId
// decodeURI
// d
// d
// d
// d
// d
// d
// d
// decodeURI
// d
// d
//
