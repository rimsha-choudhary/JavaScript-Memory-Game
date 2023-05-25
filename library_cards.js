const cards = (() => {
    // storing src attributes of images in below array
    const images = [
		"images/card_1.png",
		"images/card_2.png",
		"images/card_3.png",
		"images/card_4.png",
		"images/card_5.png",
		"images/card_6.png",
		"images/card_7.png",
		"images/card_8.png",
		"images/card_9.png",
		"images/card_10.png",
		"images/card_11.png",
		"images/card_12.png",
		"images/card_13.png",
		"images/card_14.png",
		"images/card_15.png",
		"images/card_16.png",
		"images/card_17.png",
		"images/card_18.png",
		"images/card_19.png",
		"images/card_20.png",
		"images/card_21.png",
		"images/card_22.png",
		"images/card_23.png",
		"images/card_24.png",
    ];
    // variables for back and blank images
    blankCard = "images/blank.png";
    backCard = "images/back.png";
  
    return {
      // to get value for back image
      get backCard() {
        return backCard;
      },
      // to get value for blank image
      get blankCard() {
        return blankCard;
      },
      // to get value of number of images
      get numberOfImages(){
        return images.length;
      },
      // to create html for cards based on number of cards
      createCardsHtml: function (numberOfCards) {
        cardsHtml = ""
        // shuffling values inside cards array
        images.sort(()=>Math.random()-0.5);
        
        // selecting half of number of cards and adding same cards again to new cards array
        var cardssrc = images.slice(0, numberOfCards/2);
        cardssrc = cardssrc.concat(cardssrc);
        // shuffling cards array\
        cardssrc.sort(()=>Math.random()-0.5);
        //console.log(cards);
        
        //for loop add HTML code for images
        var row_n = 1
        for (let i = 0; i < cardssrc.length; i+=8) {
            cardsHtml += '<div>';
            cardssrc.slice(i, i+8).forEach(function memorygame(item, index) {
                cardsHtml += '<div class="card"><a id="'+item+'" href="#"><img src='+backCard+' alt="" /> </a></div>';
            });
            cardsHtml += '</div>';
            row_n += 1;
        };
        return cardsHtml;
      },
      // to flip cards
      flipFadeOut: (card) => {
        $(card).fadeOut(500);
      },
      flipFadeIn: (card) => {
        $(card).fadeIn(500);
      }
    };
  })();
  