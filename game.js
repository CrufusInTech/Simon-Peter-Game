var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var highScore = 0;

// Detect a keyboard press to start the game
$(document).on("keypress touchstart", function () {
  if (!started) {
    started = true;
    $("#level-title").text("Level " + level);
    nextSequence();
  }

});

// Handle button clicks
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  // Check the user's answer
  checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
  var recentUserAnswer = userClickedPattern[currentLevel];
  var recentGamePattern = gamePattern[currentLevel];

  if (recentUserAnswer === recentGamePattern) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
        userClickedPattern = [];
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
   
      
    $("#level-title").text("Better luck next time!");


    setTimeout(function() {
      $("#level-title").text("Tap screen (📱) or press any key (⌨️) to start");
    }, 2000);

    
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Generate the next sequence
function nextSequence() {

  level++;
  $("#level-title").text("Level " + level);

  if(level > highScore){
    highScore = level;
    $("#highScore").text(level);
  }

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).addClass("pressed");

  setTimeout(function () {
   $("#" + randomChosenColour).removeClass("pressed");
  }, 150); // remove after 150ms


  playSound(randomChosenColour);
}

// Play sound based on button colour
function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

// Animate button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

// How to play button
$(function () {
  // Open the How to Play modal
  $("#how-to-play-btn").on("click", function () {
    $("#how-to-play-box").removeClass("hidden");
  });

  // Close the How to Play modal
  $("#close-how-to").on("click", function () {
    $("#how-to-play-box").addClass("hidden");
  });

  // Optional: allow closing modal when clicking outside the box
  $("#how-to-play-box").on("click", function (e) {
    if (e.target.id === "how-to-play-box") {
      $("#how-to-play-box").addClass("hidden");
    }
  });


});

