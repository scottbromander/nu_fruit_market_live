/*
Prime Group jQuery Challenge
jQuery is great! It allows us to do so many things! You and your group will need to
flex everything you know about Javascript, jQuery, and Bootstrap to tackle this challenge.

The Fruit Market
X - For this challenge, you will be working with 4 commodities; Apples, Oranges, Bananas,
and Grapes. Delicious, right?

X - When the application loads, you will need to have information for each of the commodities,
specifically the name and the ‘market price’ of each. This information will need to be
displayed in a meaningful way on the DOM.

TODO : Every 15 seconds, the prices should change however, and with it, the listed price on the DOM.

X - Specifically, the market price of each of the items should fluctuate up or down 50 cents
(between 1 cent and 50 cents) with each 15 second interval. Any given fruit is not allowed
to go below a cost of 50 cents, or above the cost of 9 dollars and 99 cents.

X - The information displayed for each of the fruit should have a ‘button like’ functionality
where the user can interact with each of the fruit displays.

X - Available to the user is a ‘total cash’

And an inventory display that shows how much of each of the fruits they have purchased.

Also in the user display, should be an ‘average
purchased price’, which shows, on average, how much money they have spent on a given fruit
in their inventory.

Meaning that by clicking on the display for each of the fruits, allows the user to ‘buy’
one of the fruits, at market price, which will be deducted from the total cash. The user
is not allowed to spend more than they have.

The user will start with $100.

Finally, style the whole experience with Bootstrap!

Hard Mode
Create a button below each of the Fruit buttons that allows the User to ‘sell’ one of
their fruits of the same type at the current market price. This will also remove one from
their inventory. The user should be not able to sell fruits they do not already own.

Pro Mode
Limit the application experience to five minutes. At the end, stop the price fluctuation,
sell all of the fruits in their inventory at current market price, and then display the
total money they earned from the experience.
*/

// GAME VALUES
var MAX_ADJUSTMENT_PRICE = 50;
var MIN_ADJUSTMENT_PRICE = 1;
var FRUIT_STARTING_PRICE = 5.0;
var USER_STARTING_CASH = 100;

var fruitArray = ["Apples", "Oranges", "Bananas", "Grapes"];

var user;

$(document).ready(function(){
    init();
});

function init(){
    setupUser();
    initialDomLoad();
    enable();
    updateUserDisplay();
}

function enable(){
    for(var i = 0; i < fruitArray.length; i++){
        $("#" + fruitArray[i].name).on("click", buyFruit);
    }
}

function buyFruit(){
  //?
  //X - Target the element, and find what kind of fruit it is
  //X - Then find its price
  //Add to player inv
  //Adjust the players cash
  //Average
  var $el = $(this).children().last();
  var fruit = $el.children().first().text();
  var price = parseFloat($el.children().last().text());

  //Have the fruit name, match that to the Inv for that specific fruit
  user["inv" + fruit].push(price);
  updateUserDisplay();
}

function updateUserDisplay(){
  console.log(fruitArray);

  for(var i = 0; i < fruitArray.length; i++){
    console.log(fruitArray[i]);

    var fruit = fruitArray[i].name;
    var $invElement = $("#inv" + fruit);
    $invElement.text(fruit + user["inv" + fruit].length);

  }
}

// .click(function(){});
// .on("click", [?] , function(){});

function setupUser(){
  user = new User();
  for(var i = 0; i < fruitArray.length; i++){
    user["inv" + fruitArray[i]] = [];
    console.log(fruitArray[i]);
    $("#userDisplay").append("<div id='inv" + fruitArray[i] + "'></div>");
    var $el = $("#userDisplay").children().last();
    $el.text(fruitArray[i] + " 0");
  }
}

function initialDomLoad(){
    for(var i = 0 ; i < fruitArray.length ; i++){
      var newFruit = new Fruit(fruitArray[i], FRUIT_STARTING_PRICE);
      fruitArray[i] = newFruit;

      // .data()    - GIMME ALL DATA
      // .data(x)   - GETTER
      // .data(x,y) - SETTER

      addFruitToDom(fruitArray[i]);
    }
}

function addFruitToDom(fruit){
  $(".fruit-container").append("<div id='" + fruit.name + "'></div>");
  $(".fruit-container").children().last().append("<button></button>");
  var $el = $(".fruit-container").children().last().children().last();

  $el.append("<p>" + fruit.name + "</p>");
  $el.append("<p>" + fruit.price + "</p>");
  fruit.adjustPrice();

  updateFruitDisplay();
}

// #id
// .class

function updateFruitDisplay(){
    for(var i = 0 ; i < fruitArray.length ; i++){
      var $el = $("#" + fruitArray[i].name).children().last().children().last();
      $el.text(fruitArray[i].price);
    }
}



function User(){
  this.startingCash = USER_STARTING_CASH;
  this.totalCash = this.startingCash;
}

function Fruit(name, price){
  this.name = name;
  this.price = price;
  this.adjustPrice = function(){
    var adjustment = randomNumber(MIN_ADJUSTMENT_PRICE, MAX_ADJUSTMENT_PRICE);

    adjustment = adjustment / 100;

    var randomAdjustment = randomNumber(1,2);
    if(randomAdjustment == 2) {
      adjustment = -adjustment;
    }

    this.price += adjustment;

    if(this.price > 9.99){
      this.price = 9.99;
    } else if (this.price < 0.50) {
      this.price = 0.50;
    }
  }
}

//// Utility Function(s) ////
function randomNumber(min, max){
	return Math.floor(Math.random() * (1 + max - min) + min);
}
