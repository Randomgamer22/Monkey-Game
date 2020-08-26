var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var Background,backgroundImage;
var score;
var bananasGroup,obstaclesGroup,speed,bananaArray = [],obstacleArray = [];
var survivalTime;
var gameIsOver = false;

function preload(){
  monkey_running =       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("Sky.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  speed = -4;
  
  ground = createSprite(200,375,800,50);
  ground.shapeColor = "#A0522D";
  ground.velocityX = speed;
  ground.x = ground.width/2
  
  Monkey = createSprite(50,325,10,10);
  Monkey.addAnimation("running",monkey_running);
  Monkey.scale = 0.1;
  Monkey.setCollider("circle",0,0,300);
  //Monkey.debug = true;
  
  bananasGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  survivalTime = 0;
}

function draw() {
  background(backgroundImage);
  
  fill("black")
  text("Bananas Collected: "+score,250,50);
  text("Survival Time: "+survivalTime,250,70);
  
  Monkey.velocityY = Monkey.velocityY + 0.8
  Monkey.collide(ground);
  
  if(gameIsOver === false){
  
    speed = -4
    if(frameCount%300 === 0){
      speed -= 1;
    }
    survivalTime = Math.ceil(frameCount/getFrameRate());
    
    
    if(ground.x < 0){
        ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& Monkey.y >= 319) {
      Monkey.velocityY = -12;
    }
    
    spawnFruits();
    spawnObstacles();
    
    for(var i=0;i<bananaArray.length;i++){
      if(bananaArray[i].isTouching(Monkey)){
        bananaArray[i].destroy();
        score++
      }
    }
    
    for(var i=0;i<obstacleArray.length;i++){
      if(obstacleArray[i].isTouching(Monkey)){
        bananasGroup.setLifetimeEach(-1);
        obstaclesGroup.setLifetimeEach(-1);
        bananasGroup.setVelocityXEach(0);
        obstaclesGroup.setVelocityXEach(0);
        fill("black");
        text("Game Over",150,150)
        textSize = 40
        gameIsOver = true;
        ground.velocityX = 0;
      }
    }
  }
  
  drawSprites();
}

function spawnFruits() {
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(220,300));
    banana.addImage(bananaImage);
    banana.scale = 0.075;
    banana.velocityX = speed;
    
    banana.lifetime = 100;
    
    Monkey.depth++
    
    bananasGroup.add(banana);
    bananaArray.push(banana);
  }
}

function spawnObstacles(){
 if (frameCount % 300 === 0){
    var obstacle = createSprite(400,330,10,40);
    obstacle.velocityX = speed;
    obstacle.addImage("obstacle",obstacleImage);    
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstacle.scale = 0.2;
    //obstacle.debug = true;
    obstacle.setCollider("rectangle",-20,0,450,400);
     
     
    obstaclesGroup.add(obstacle);
    obstacleArray.push(obstacle);
 }
}
