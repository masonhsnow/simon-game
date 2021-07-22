"use strict";

let gameState = false;

//Users click pattern array
let userClickPattern = [];

//Array for game pattern as it goes
let gamePattern = [];

//button colors array
const buttonColors = ["red", "blue", "green", "yellow"];

let level = 1;
//////////////////////////////////////////
//Add sounds to button clicks

const playSound = function (name) {
  //Play sound for selected color
  const colorSound = new Audio(`sounds/${name}.mp3`);
  colorSound.play();
};

const animatePress = function (currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
};

const startOver = function () {
  level = 1;
  gamePattern = [];
  gameState = false;
};

const wrongAnswer = function () {
  playSound(`wrong`);

  $("body").addClass("game-over");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").text("Game Over! Press any key to restart!");
};
/////////////////////////////////////////////////
//Check if user answers are the same as game pattern

const checkAnswer = function (currentLevel) {
  console.log(`GAME PATTERN`, gamePattern);
  console.log(`USER PATTERN`, userClickPattern);

  if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
    console.log("SUCCESS");

    if (gamePattern.length === userClickPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    wrongAnswer();
    startOver();
  }
};

//////////////////////////////////////////////
//Function that generates a random number
const nextSequence = function () {
  userClickPattern = [];

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];

  //push it to the gamePattern array
  gamePattern.push(randomChosenColor);
  console.log(randomChosenColor);

  //Flash chosen color
  $(`#${randomChosenColor}`).fadeOut().fadeIn();

  //Play sound
  playSound(randomChosenColor);

  //Change Level Heading
  $("h1").text(`Level ${level}`);

  //Increase level each time
  level++;
};

///////////////////////////////////////////////
//Event listener for keypress to launch next sequence
$(document).on("keypress", function () {
  if (!gameState) {
    nextSequence();
    gameState = true;
  }
});

/////////////////////////////////////////////////
//Event listener for clicking any of the colors + storing those inputs
$(".btn").on("click", function (e) {
  const userChosenColor = $(e.target).attr("id");
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});
