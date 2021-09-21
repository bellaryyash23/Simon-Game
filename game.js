var buttonColors=["red", "blue", "green", "yellow"];
var gameSequence=[];
var userClickedPattern = [];
var level=0;
var started = false;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });


$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChoseColor = buttonColors[randomNumber];
    gameSequence.push(randomChoseColor);
    $("#"+ randomChoseColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColor);
    level++;
    $("h1").html("Level "+level);
    
    

}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();

}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout (function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {

    if (gameSequence[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gameSequence.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
function startOver() {
    level = 0;
    gameSequence = [];
    userClickedPattern =[];
    started = false;
}
  