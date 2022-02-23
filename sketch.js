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

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6, {x:245, y:30});


  fruit_options = {
    density: 0.001,
  }
  
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Composite.add(rope.body,fruit);

  link = new LineLink(rope, fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  ground.show();

  rope.show();

  fill("red");
  ellipse(fruit.position.x, fruit.position.y, 15, 15);
  
  Engine.update(engine);
   
}
