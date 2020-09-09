var dog, happyDog, database, foodS, foodStock, dogImg, feed, addFood;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  dog = createSprite()
}

function setup() {
	createCanvas(1000, 1000);
  dog = createSprite(500, 500);
  dog.addImage(dogImg);
  database = firebase.database();
  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  feed=createButton("Feed the dog");
  feed.position(700,96);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46, 139, 87);
  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 +"PM",350,30);
  }else if (lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : "+ lastFed + " AM",350,30);
  }


  drawSprites();

  textSize(25);
  text("foodStock: " + foodStock.val(), 100,130);
}

function readStock(data){
  foodS=data.val();
}

function writeStock () {
  if (x<=0){
    x=0;
  }else{
    x=x-1;
  }
   database.ref('/').update({
     Food:x
   })
  
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food: foodS
   })
  }
