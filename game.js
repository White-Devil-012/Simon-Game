
var gamePattern=[];
var buttonColours=["red", "blue", "green", "yellow"];

var userClickedButton=[];

var started=false;
var level=0;

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedButton.push(userChosenColour);
    // console.log(userClickedButton);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedButton.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedButton[currentLevel]){
    console.log("success");

    if(userClickedButton.length===gamePattern.length){
        setTimeout(function(){
            nextSequence();
        },1000);
    }
} else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game over, Press any key to restart");

    startOver();
}
}

function nextSequence(){

    userClickedButton=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
