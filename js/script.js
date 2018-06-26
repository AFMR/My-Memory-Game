$(document).ready(function(){

    /*
    * Create a list that holds all of your cards
    */
    const allCards = [
        "fa fa-diamond",
        "fa fa-paper-plane-o",
        "fa fa-anchor",
        "fa fa-bolt",
        "fa fa-cube",
        "fa fa-anchor",
        "fa fa-leaf",
        "fa fa-bicycle",
        "fa fa-diamond",
        "fa fa-bomb",
        "fa fa-leaf",
        "fa fa-bomb",
        "fa fa-bolt",
        "fa fa-bicycle",
        "fa fa-paper-plane-o",
        "fa fa-cube"];

    let moved = 0;
    let first_card = null;
    let second_card = null;
    let counter = 0;
    let pairs = 0; // added 

    let seconds = 0;
    let minutes = 0;
    let timer_start = false;
    let game_timer = null;
    let rating = "3 stars";
    
    let moves_taken = $('.moved');
    let moved_string = "moves taken: ";
    let performance_raiting = $('.performance_rating');
    let rating_string = "Performance rating: ";
    let time_taken = $('.time_taken');
    let modal_element = $(".modal");
    var time_string = "Time taken: ";
    


    $('.card').click(function(){

        if (timer_start === false) {
            timer();
            timer_start = true;
        }

        if (moved === 0){
            $(this).addClass('open');
            first_card = $(this);
            moved = moved + 1;
        }
        else if (moved === 1){
            $(this).addClass('open');
            second_card = $(this);
            moved = moved + 1;
            counter = counter + 1;
        }

        if (moved === 2){
            
            if (first_card.find('i').attr('class') === second_card.find('i').attr('class')){
                matched(first_card, second_card);
            }
            else{
                notMatch(first_card, second_card);
            }
            moved=0;
        }

        scores(counter);
    });

    function matched(first_card, second_card) {
        first_card.addClass('match');
        second_card.addClass('match');
        pairs = pairs + 1; //added

        if(pairs === 8){
            endGame();
        }
    }

    function notMatch(first_card, second_card) {
        first_card.addClass('not-a-match');
        second_card.addClass('not-a-match');
        closeCards(first_card, second_card);
    }
    
    function closeCards(first_card, second_card){
        setTimeout(function(){
            first_card.removeClass('not-a-match open');
            second_card.removeClass('not-a-match open');
        }, 500);
    }

    function timer() {
        game_timer = setInterval(function() {
            if(seconds < 60) {
                $('.seconds').text(seconds + " sec");
                seconds = seconds + 1;
            }
            else if (seconds >= 60) {
                $('.minutes').css('visibility', 'visible');
                $('.colon_two').css('visibility', 'visible');
                seconds = 0;
                minutes = minutes + 1;
                $('.seconds').text(seconds + " sec");
                $('.minutes').text(minutes + " min");
                seconds = seconds + 1;
            }
          }, 1000);
      }
  
      function scores(counter){
        if(counter > 1) {
            $('.score-panel').find('.moves').text(counter);
            $('.moves_text').text("Moves");
        }
        else if (counter === 1) {
            $('.score-panel').find('.moves').text(counter);
            $('.moves_text').text("Move");
        }

        if (counter === 14) {
            $('#first-star').removeClass('fa-star').addClass('fa-star-o');
            rating = "2 stars";
        }
        else if (counter === 24) {
            $('#second-star').removeClass('fa-star').addClass('fa-star-o');
            rating = "1 star";
        }
        else if (counter >= 34) {
            $('#third-star').removeClass('fa-star').addClass('fa-star-o');
            rating = "0 stars";
        }
    }

    function endGame() {
        clearInterval(game_timer);
        timer_start = false;

        modal_element.css('display', 'block');

        performance_raiting.text(rating_string + rating);
        time_taken.text(
            time_string + 
            $('.minutes').text() +
            $('.colon_two').text() +
            $('.seconds').text());
        moves_taken.text(moved_string + counter);
    }

    $('.play_again').click(function() {
        restartGame();
        modal_element.css('display', 'none');
    });

    $('.restart').click(function(){
        restartGame();
    });

    function restartGame() {
        $('.card').removeClass('open match');
        moved = 0;
        pairs = 0;
        rating = "3 stars";
    
        clearInterval(game_timer);
        seconds = 0;
        minutes = 0;
        counter =0;
    
        $('.colon_one').css('visibility', 'hidden');
        $('.minutes').css('visibility', 'hidden');
        $('.colon_two').css('visibility', 'hidden');
        $('.seconds').text(seconds + "s");
        $('.minutes').text(minutes);

        timer_start = false;

        $('.score-panel').find('.moves').text(counter);

        $('#first-star').removeClass('fa-star-o').addClass('fa-star');
        $('#second-star').removeClass('fa-star-o').addClass('fa-star');
        $('#third-star').removeClass('fa-star-o').addClass('fa-star');

        shuffle(allCards);
        var shuffled_deck = allCards;

        $('#card_1').removeClass().addClass(shuffled_deck[0]);
        $('#card_2').removeClass().addClass(shuffled_deck[1]);
        $('#card_3').removeClass().addClass(shuffled_deck[2]);
        $('#card_4').removeClass().addClass(shuffled_deck[3]);
        $('#card_5').removeClass().addClass(shuffled_deck[4]);
        $('#card_6').removeClass().addClass(shuffled_deck[5]);
        $('#card_7').removeClass().addClass(shuffled_deck[6]);
        $('#card_8').removeClass().addClass(shuffled_deck[7]);
        $('#card_9').removeClass().addClass(shuffled_deck[8]);
        $('#card_10').removeClass().addClass(shuffled_deck[9]);
        $('#card_11').removeClass().addClass(shuffled_deck[10]);
        $('#card_12').removeClass().addClass(shuffled_deck[11]);
        $('#card_13').removeClass().addClass(shuffled_deck[12]);
        $('#card_14').removeClass().addClass(shuffled_deck[13]);
        $('#card_15').removeClass().addClass(shuffled_deck[14]);
        $('#card_16').removeClass().addClass(shuffled_deck[15]);
    }


    // Shuffle function from http://stackoverflow.com/a/2450976
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }




    /*
    * set up the event listener for a card. If a card is clicked:
    *  - display the card's symbol (put this functionality in another function that you call from this one)
    *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    *  - if the list already has another card, check to see if the two cards match
    *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
    *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
    *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
    *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
    */

  } );

