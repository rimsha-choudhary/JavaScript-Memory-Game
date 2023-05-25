// function to be used when we want to sleep the execution of code for some milliseconds
function sleep(ms) {
    return new Promise(timeout => setTimeout(timeout, ms));
}

// variable to strore objects of two cards
firstCard = null;
secondCard = null;

// function to handle card click event
const cardClickHandler = function (event) {
    // incementing number of turns for every card click event
    scores.incrementNumberOfTurns();
    // if firstcard is null then the current clicked card is first card.
    if (firstCard == null){
        // creating Card object for first card
        firstCard = new Card($(event.target.parentElement));
        // when clicked if card is Blank we flip the card else we won't flip
        if(firstCard.isCardBack()){
            cards.flipFadeOut(firstCard.imageTag);
            $(firstCard.imageTag).attr("src", firstCard.idAttribute);
            cards.flipFadeIn(firstCard.imageTag);
        }
    }
    else{
        // similar to first card we are making second card object and flipping it
        secondCard = new Card($(event.target.parentElement));
        if(secondCard.isCardBack()){
            cards.flipFadeOut(secondCard.imageTag);
            $(secondCard.imageTag).attr("src", secondCard.idAttribute);
            cards.flipFadeIn(secondCard.imageTag);
        }
        // if cards match we remove them else we flip back with 1 second delay
        if (secondCard.areCardsMatched(firstCard)){
            scores.incrementNumberOfMatchedTurns();
            async function turnblank() {
                await sleep(1000);
                cards.flipFadeOut(firstCard.imageTag);
                $(firstCard.imageTag).attr("src", cards.blankCard);
                cards.flipFadeIn(firstCard.imageTag);
                cards.flipFadeOut(secondCard.imageTag);
                $(secondCard.imageTag).attr("src", cards.blankCard);
                cards.flipFadeIn(secondCard.imageTag);
                firstCard = null;
                secondCard = null;
            }
            turnblank();
        }
        else{
            async function turnback() {
                // to make code execution wait for 1 second
                await sleep(1000);
                // turning back both cards
                cards.flipFadeOut(firstCard.imageTag);
                $(firstCard.imageTag).attr("src", cards.backCard);
                cards.flipFadeIn(firstCard.imageTag);
                cards.flipFadeOut(secondCard.imageTag);
                $(secondCard.imageTag).attr("src", cards.backCard);
                cards.flipFadeIn(secondCard.imageTag);
                firstCard = null;
                secondCard = null;
            }
            turnback();
        }
    }
    // checking board is empty
    if (scores.isBoardEmpty()){
        // if board is empty we show correct score and update highscore
        highScore = scores.displayHighScore();
        // indicating game is over
        $("#cards").replaceWith('<h1> Game Over </h1>');
        // displayig high score and current game score
        $("#high_score").text("High Score: "+highScore+"%");
        $("#correct").text("Correct: "+scores.percentageOfCorrectSelections()+"%");
    }
}

$(document).ready(function(){
    
    // using tab widget 
    $("#tabs").tabs();
    
    // using settings library and saving player name and number of cards
    var player = settings.values.playerName;
    var number_of_cards = settings.values.numberOfCards;
    if(number_of_cards == null){
        settings.values = {
            playerName: $("#player_name").val(),
            numberOfCards: $("#num_cards").val(),
        };
        var player = settings.values.playerName;
        var number_of_cards = settings.values.numberOfCards;
    }
    // reading highscore of current player
    var highScore = scores.displayHighScore();

    // setting value of player in player id text
    if (player){
        $("#player").html("Player: " + player);
    }
    if (highScore){
        $("#high_score").html("High Score: "+highScore+"%");
    }
    else{
        highScore = 0;
    }
    // when save settings is clicked we are going to save playername and number of cards in local storage
    // and reloading page
    $("#save_settings").on("click", function(){
        settings.values = {
            playerName: $("#player_name").val(),
            numberOfCards: $("#num_cards").val(),
        }
		location.reload();
	});
    // using cards createCardsHtml to create HTML for cards
    $("#cards").html(cards.createCardsHtml(number_of_cards));
    // using cardClickHandler to handle every card click event
    $("#cards").click(cardClickHandler);
});
