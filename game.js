var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//$("h1").html("<h1> Press Any Key to Start</h1>");

$(document).keypress(function(event){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequnece();
    started = true;
  }
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $('#'+currentColour).addClass("pressed");
  setTimeout(function(){
    $('#'+currentColour).removeClass("pressed");
  }, 100);

}

function nextSequnece(){
  userClickedPattern = [];

  level++;
  $("level-title").text("level " + level);



  var randomNumber = Math.floor(Math.random() * 4);
  var randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);

  $("#"+randomColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomColour);

}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});



function startOver(){
  $("#level-title").text("Press A Key to Start");
  started = false;
  gamePattern = [];
  userClickedPattern = [];
  level = 0;


}


function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function (){
        nextSequnece();
      }, 1000);


    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 100);

    console.log("wrong")}
    startOver();
}
