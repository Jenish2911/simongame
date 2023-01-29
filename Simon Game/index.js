var buttonColors = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern =[];

var start = false;
var level = 0;

$(document).keypress(function(){
    if(!start){
    $("#level-title").text("Level " + level);
    nextSequence();
    start=true;
    }
});

$(".btn").click(function(){
    var userClick = $(this).attr("id");
    userClickedPattern.push(userClick); 

    playSound(userClick);
    animation(userClick);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLev){
    if(userClickedPattern[currentLev] === gamePattern[currentLev]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length)
            setTimeout(nextSequence(), 1000);
    }
    else{
        console.log("Fail");

        playSound("wrong");
        
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("GAME OVER, Press any key to restart");
        
        startOver();
    }
}    

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChooseColor = buttonColors[randomNumber];
    gamePattern.push(randomChooseColor);

    $("#" + randomChooseColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChooseColor);
}    

function playSound(name){
    var audio = new Audio("D:/Web Development/My Codes/Simon Game/sounds/" + name + (".mp3"));
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}    

function animation(key){
    $("#" + key).addClass("pressed");
    setTimeout(function(){
        $("#" + key).removeClass("pressed");
    },100);
}