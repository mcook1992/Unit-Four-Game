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
// var $instructionTextElement = $("#instructionText");

//creating objects for each of the characters:

var firstCharacter = {
  name: "firstCharacter",
  healthPoints: 100,
  attackPower: 8,
  counterAttackPower: 20
};
var secondCharacter = {
  name: "secondCharacter",
  healthPoints: 110,
  attackPower: 6,
  counterAttackPower: 25
};
var thirdCharacter = {
  name: "thirdCharacter",
  healthPoints: 90,
  attackPower: 10,
  counterAttackPower: 20
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
    //code for moving characters around
    var chosenCharacter = $(this).removeClass("selectAPlayer");
    chosenCharacterID = $(this).attr("id");
    // console.log("The chosen chracter id is: " + chosenCharacterID);
    chosenCharacter.attr("class", "chosenCharacter");
    $(".yourCharacterContainer").append(chosenCharacter);
    mainCharacterIsSelected = true;
    var chosenEnemies = $(".selectAPlayer");
    chosenEnemies.attr("class", "enemy");
    $(".enemiesAvailableContainer").append(chosenEnemies);
    $("#instructionText").text("Now pick an enemy to battle.");

    //code for adjusting main character health points and attack power based on which character is chosen.

    for (var i = 0; i < characterArray.length; i++) {
      if (characterArray[i].name == chosenCharacterID) {
        console.log(
          "We have a match! The matching ID is: " + characterArray[i].name
        );
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
    var chosenDefender = $(this).attr("class", "currentDefender");
    var chosenDefenderID = $(this).attr("id");
    // console.log("Chosen Defender id: " + chosenDefenderID);
    $(".defenderContainer").append(chosenDefender);
    defenderIsSelected = true;
    // console.log("Defender is selected!");

    //Setting defender health and attack points etc.

    for (var d = 0; d < characterArray.length; d++) {
      console.log("we're in the for loop");
      if (characterArray[d].name == chosenDefenderID) {
        console.log(
          "We have a defender match! The matching ID is: " +
            characterArray[d].name
        );
        defenderHealthPoints = characterArray[d].healthPoints;
        defenderCounterAttackPower = characterArray[d].counterAttackPower;
        $("#instructionText").text(
          "Now click the attack button to do battle with your opponent"
        );
        console.log(
          defenderCounterAttackPower + " and " + defenderHealthPoints
        );
      }
    }
  } else {
    alert(
      "Nothing else can happen right now! Press the attack button and finish this battle before choosing another defender"
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

    console.log("Defender Health Points:" + defenderHealthPoints);

    //setting up the counter attack if the defender still has health points

    if (defenderHealthPoints > 0) {
      mainHealthPoints = mainHealthPoints - defenderCounterAttackPower;
      console.log("Main Health Points: " + mainHealthPoints);
      $(".yourCharacterContainer")
        .find(".characterHealth")
        .text(mainHealthPoints);
      $("#instructionText").text(
        "Your opponent counter attacked you for: " +
          defenderCounterAttackPower +
          " points"
      );

      //seeing if the defender has killed the main character

      if (mainHealthPoints < 1) {
        mainHealthPoints = 0;
        alert("You're toast! Press restart to try again");
        $("#restart").removeClass("hidden");
        $("#attackButton").attr("class", "hidden");
        $("#instructionText").text("You lost! Press restart to try again");
        //code to make the restart button unhiddden
      }
    } else {
      //if the defender is killed
      console.log("Defender has zero defense left!");
      $("#instructionText").text(
        "You defeated your defender! Now pick another one"
      );
      defenderIsSelected = false;
      $(".currentDefender").attr("class", "hidden");
      numberOfEnemiesToDefeat = numberOfEnemiesToDefeat - 1;
      //Win condition!
      if (numberOfEnemiesToDefeat < 1) {
        alert("You won! Press restart to play again!");
        $("#restart").removeClass("hidden");
        $("#attackButton").attr("class", "hidden");
        $("#instructionText").text("You won! Now press restart to play again");
      }
    }
  }
});

$("#restart").on("click", function() {
  alert("restart button is working!");
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
