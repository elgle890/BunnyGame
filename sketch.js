const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;




let engine;
let world;
var ground;

var rope;
var fruit, fruit_options;
var link;
var backgroundImg, bunnyImg, melonImg;
var bunny, bunnyBlink, bunnyEating, sadBunny;
var button;


function preload() {
  backgroundImg = loadImage("./images/background.png");
  bunnyImg = loadImage("./images/Rabbit-01.png");
  melonImg = loadImage("./images/melon.png");
  sadBunny = loadAnimation("images/sad_1.png", "images/sad_2.png", "images/sad_3.png")
  bunnyBlink = loadAnimation("./images/blink_1.png", "./images/blink_2.png", "./images/blink_3.png");
  bunnyEating = loadAnimation("./images/eat_0.png", "./images/eat_1.png", "./images/eat_2.png", "./images/eat_3.png", "./images/eat_4.png");
  bunnyEating.looping = false;
  sadBunny.looping = false;

}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6, {x:245, y:30});

  bunny = createSprite(250, 620, 100, 100);
  // bunny.addImage(bunnyImg);

  bunny.scale = 0.2;
  bunnyBlink.frameDelay = 20;
  sadBunny.frameDelay = 20;
  
  bunny.addAnimation("bunny blink", bunnyBlink);
  bunnyEating.frameDelay = 20;
  bunny.addAnimation("bunny eating", bunnyEating);
  bunny.addAnimation("sad bunny", sadBunny);
  
  fruit_options = {
    density: 0.001,
  }
  
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Composite.add(rope.body,fruit);

  link = new LineLink(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
  
  button = createImg("./images/cut_btn.png");
  button.position(220, 20);
  button.size(50,50);
  button.mouseClicked(drop);
}

function draw() 
{
  background(51);
  
  image(backgroundImg, 250, 350, width, height);
  ground.show();

  rope.show();

  if(fruit != null) {
    image(melonImg, fruit.position.x, fruit.position.y, 70, 70);
  }
   
  
  Engine.update(engine);

  drawSprites();

  if(collide(fruit, bunny, 80, true) == true) {
    bunny.changeAnimation("bunny eating");
  }

  if(collide(fruit, ground.body, 25, false) == true) {
    bunny.changeAnimation("sad bunny");
  }
   
}

function collide(objectA, objectB, limite, withX) {
    if(objectA != null && objectB != null) {
      if(withX){
        var distanceDiff = dist(objectA.position.x, objectA.position.y,objectB.position.x, objectB.position.y);
      } else {
        var distanceDiff = dist(0, objectA.position.y,0, objectB.position.y);
      }
      
      if(distanceDiff <= limite) {
        World.remove(world, fruit);
        fruit = null;
        return true;
      } else {
        return false;
      }
    }

  
}

function drop() {
  rope.break();
  link.detach();
  link = null;
}