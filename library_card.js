class Card {
    // variables to store image tag and id attribute
    imageTag = null;
    idAttribute = null;
    constructor(clickedATag) {
        // getting values of image tag and id attribute from <a> tag
        this.imageTag = clickedATag.children()[0];
        this.idAttribute = clickedATag.attr("id");  
    }
    // checking card is back or not
    isCardBack() {
        if($(this.imageTag).attr("src") == "images/back.png"){
            return true;
        }
        else{
            return false;
        }
    }
    // checking card is blank or not
    isCardBlank() {
      if($(this.imageTag).attr("src") == "images/blank.png"){
          return true;
      }
      else{
          return false;
      }
  }
    // checking cards are matched or not
    areCardsMatched(firstCard) {
      if (this.idAttribute == firstCard.idAttribute) {
        return true;
      }
      else{
        return false;
      }
    }
  }
  