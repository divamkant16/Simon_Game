var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var lvl = 0;
$(document).keydown(function()
{
    if(!started)
    {
        $("#level-title").text("Level " + lvl);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function()
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAns(userClickedPattern.length - 1);
});

function checkAns(currLevel)
{
    if(userClickedPattern[currLevel] === gamePattern[currLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        playSound("wrong");

        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
    
}

function nextSequence()
{
    userClickedPattern = [];
    lvl++;
    $("#level-title").text("Level " + lvl);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function playSound(name)
{
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour)
{
    var buttonActive = $("."+currentColour);
    buttonActive.addClass("pressed");

    setTimeout(function() {
        buttonActive.removeClass("pressed");
    }, 100);
}

function startOver()
{
    started = false;
    gamePattern = [];
    lvl = 0;
}