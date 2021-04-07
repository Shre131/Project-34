//Create variables here

var dog, happyDog, database, foodS, foodStock;

function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog=createSprite(250,250, 20, 20);
  dog.scale=0.5;
  dog.addImage(dogImage);
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);
  
}



function draw() {  
background(46,139,87);

if (keyDown(UP_ARROW)) {
  writeStock(foodS);
  dog.addImage(happyDog);
}
fill("white");
textSize(15);
text("Food Remaining: "+foodS,200,50);


  drawSprites();
  //add styles here

}
function readStock(food) {
foodS=food.val();
}

function writeStock(food) {
if(food<=0) {
  food=0;
}
else{
  food=food-1;
}
database.ref("/").update({
  Food:food,
})

}

