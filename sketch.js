var dog,sadDog,happyDog;
var foodStock;
var database ;
var foodObj , feedTime , lastFed;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,1000);
  database= firebase.database();
  
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
foodObj = new Food ();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
feed = createButton("Feed The Dog");
feed.position(700,95);
feed.mousePressed(feedDog)
addFood = createButton("Add Food");
addFood.position(800,75);
addFood.mousePressed(addFoods)
}

function draw() {
  background(46,139,87);
  foodObj.display();
feedTime = database.ref('FeedTime');
feedTime.on("value",function(data){
  lastFed = data.val()
})
console.log(stock);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();

}

function feedDog(){
  dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);

  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
//function to update food stock and last fed time
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//function to add food in stock
