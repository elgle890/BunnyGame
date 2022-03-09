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
var bunny;
var button;

function preload() {
  backgroundImg = loadImage("./images/background.png");
  bunnyImg = loadImage("./images/Rabbit-01.png");
  melonImg = loadImage("./images/melon.png");
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
  bunny.addImage(bunnyImg);

  bunny.scale = 0.2;


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
   
}

function collide(objectA, objectB) {
    if(objectA != null && objectB != null) {
      var distanceDiff = dist(objectA.position.x, objectA.position.y,objectB.position.x, objectB.position.y);
      if(distanceDiff <= 80) {
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