var dB;
var dog, happyDog,foodS,foodStock,sadDog
var lastFed 

function preload()
{
  sadDog = loadImage("images/dogImg.png")
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(1000, 1000);
  dB = firebase.database();
  dog = createSprite(500,550);
  dog.addImage(sadDog);
  dog.scale=0.5
  /*
  foodStock=dB.ref("Food");
  foodStock.on("value",readStock)*/
  foodObj = new food();
  foodObj.getFoodStock();

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);
  foodObj.display()
  foodObj.getLastFed()
  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: ", lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed: 12 AM", 350, 30)
  }else{
    text("Last feed: " + lastFed + "AM", 350,30)
  }
}
/*function readStock(data){
  foodS=data.val()

}*/
function writeStock(x){
  if(x<=0){
    x=0;
  }else {
    x=x-1
  }
  dB.ref('/').update({
    'Food': x
  })
}
function feedDog(){
  dog.addImage(happyDog);
  foodObj.getFoodStock();

  foodObj.updateFoodStock(foodStock);

}
function addFoods(){
  foodStock++;
  dB.ref('/').update({
    'Food': foodStock
  })
}