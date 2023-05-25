const scores = (() => {
    // varibales for number of turns and number of matched turns
    let numberOfTurns = 0;
    let numberOfMatchedTurns = 0;
  
    // setting highscore with playername so that we can save highscore of each player
    const setHighScore = (score) => {
        localStorage.setItem(settings.values.playerName, score);
    };

    // reading highscore of particular player
    const getHighScore = (playerName) =>{
        return localStorage.getItem(playerName);
    };
    return {
        // functions to increment number of turns and number of matched turns
        incrementNumberOfTurns: () => {
            numberOfTurns += 1;
        },
        incrementNumberOfMatchedTurns: () => {
            numberOfMatchedTurns += 2;
        },
        // checking board is empty or not
        isBoardEmpty: () => {
            if (numberOfMatchedTurns == settings.values.numberOfCards){
                return true;
            }
            else{
                return false;
            }
        },  
        // calculating score and returning it
        percentageOfCorrectSelections: () => {
            let score = Math.round((numberOfMatchedTurns / numberOfTurns)*10000);
            score = score / 100;
            return score;
        },
        // public function to get high score from private function
        getHighScore: () => {
            return getHighScore(settings.values.playerName);
        },
        // to compare and change highscore
        displayHighScore: () => {
            if(getHighScore(settings.values.playerName) == null && scores.percentageOfCorrectSelections()){
                setHighScore(scores.percentageOfCorrectSelections());
            }
            if (scores.percentageOfCorrectSelections() > getHighScore(settings.values.playerName)){
                setHighScore(scores.percentageOfCorrectSelections());
            }
            return getHighScore(settings.values.playerName);
        }
    };
  })();
   