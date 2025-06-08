// Array of possible button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// This array will store the game's pattern
var gamePattern = [];

// This array will store the player's clicked pattern
var userClickedPattern = [];

// Track the current level
var level = 0;

// To track if the game has started
var started = false;

// Highest level reached so far
var highScore = 0;

// Start the game on a keypress or touch (mobile-friendly)
$(document).on("keypress touchstart", function () {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }
});

// Detect when the user clicks a color button
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // Play the sound for the clicked color
  playSound(userChosenColour);

  // Animate the press
  animatePress(userChosenColour);

  // Check if the user's click is correct
  checkAnswer(userClickedPattern.length - 1);
});

// Check the user's answer against the game pattern
function checkAnswer(currentLevel) {
  var recentUserAnswer = userClickedPattern[currentLevel];
  var recentGamePattern = gamePattern[currentLevel];

  if (recentUserAnswer === recentGamePattern) {
    console.log("success");

    // If the full sequence has been matched
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }

  } else {
    // Wrong answer!
    console.log("wrong");

    playSound("wrong");

    // Flash screen red
    $("body").addClass("game-over");

    // Show "game over" message
    $("#level-title").text("Better luck next time!");

    // After 2 seconds, show restart prompt
    setTimeout(function() {
      $("#level-title").text("Tap screen or press any key to start");
    }, 2000);

    // Remove red flash effect quickly
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Reset the game
    startOver();
  }
}

// Generate and display the next color in the sequence
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  // Update high score if needed
  if(level > highScore){
    highScore = level;
    $("#highScore").text(level);
  }

  // Randomly select a color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Flash the button
  $("#" + randomChosenColour).addClass("pressed");

  // Remove flash after short delay
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 150);

  // Play sound for the selected color
  playSound(randomChosenColour);
}

// Play the sound based on color name
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

// Add animation when user presses a button
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Reset the game variables to start over
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

// ========== HOW TO PLAY BUTTON ==========

$(function () {
  // Open the "How to Play" instructions
  $("#how-to-play-btn").on("click", function () {
    $("#how-to-play-box").removeClass("hidden");
  });

  // Close the "How to Play" instructions
  $("#close-how-to").on("click", function () {
    $("#how-to-play-box").addClass("hidden");
  });

  // Close when clicking outside the instruction box
  $("#how-to-play-box").on("click", function (e) {
    if (e.target.id === "how-to-play-box") {
      $("#how-to-play-box").addClass("hidden");
    }
  });
});
