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

var rope, rope2, link2, rope3, link3;
var fruit, fruit_options;
var link;
var backgroundImg, bunnyImg, melonImg;
var bunny, bunnyBlink, bunnyEating, sadBunny;
var sEating, sRope_cut, sBackGround;
var button, button2, button3, ballonButton, muteButton;
var isMobile;
var canW, canH;

function preload() {
  backgroundImg = loadImage("./images/background.png");
  bunnyImg = loadImage("./images/Rabbit-01.png");
  melonImg = loadImage("./images/melon.png");
  sadBunny = loadAnimation("images/sad_1.png", "images/sad_2.png", "images/sad_3.png")
  bunnyBlink = loadAnimation("./images/blink_1.png", "./images/blink_2.png", "./images/blink_3.png");
  bunnyEating = loadAnimation("./images/eat_0.png", "./images/eat_1.png", "./images/eat_2.png", "./images/eat_3.png", "./images/eat_4.png");
  bunnyEating.looping = false;
  sadBunny.looping = false;

  sEating = loadSound("./sound/eating_sound.mp3");
  sRope_cut = loadSound("./sound/rope_cut.mp3");
  sBackGround = loadSound("./sound/sound1.mp3");

}

function setup() 
{
  isMobile = /iPhone|iPad|Android|iPod/i.test(navigator.userAgent);
  console.log(isMobile)
  if(isMobile) {
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(displayWidth,displayHeight);
  } else {
    canW = 500;
    canH = 700;
    createCanvas(500,700);
  }
  
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(canW /2, canH - 20,canW,20);
  rope = new Rope(8, {x:40, y:30});
  rope2 = new Rope(7, {x:370, y:40});
  rope3 = new Rope(4, {x: 400, y:225});

  bunny = createSprite(150, canH - 80, 100, 100);
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
  link2 = new LineLink(rope2, fruit);
  link3 = new LineLink(rope3, fruit);

  

  sBackGround.play();
  sBackGround.setVolume(0.50);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER);
  textSize(50)
  
  button = createImg("./images/cut_btn.png");
  button.position(20, 30);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg("./images/cut_btn.png");
  button2.position(330, 35);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  button3 = createImg("./images/cut_btn.png");
  button3.position(360, 200);
  button3.size(50, 50);
  button3.mouseClicked(drop3);

 // ballonButton = createImg("./images/balloon.png");
 // ballonButton.position(10, 250);
 // ballonButton.size(150, 100);
 // ballonButton.mouseClicked(airBallon);

  muteButton = createImg("./images/mute.png");
  muteButton.position(canW - 80, 10);
  muteButton.size(50, 50);
  muteButton.mouseClicked(muteSound);
}

function draw() 
{
  background(51);
  
  image(backgroundImg, canW / 2, canH/ 2, canW, canH);
  ground.show();

  rope.show();
  rope2.show();
  rope3.show();

  if(fruit != null) {
    image(melonImg, fruit.position.x, fruit.position.y, 70, 70);
  }

  
   
  
  Engine.update(engine);

  drawSprites();

  if(collide(fruit, bunny, 80, true) == true) {
    bunny.changeAnimation("bunny eating");
    sEating.play();
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

  sRope_cut.play();
}

function drop2() {
  rope2.break();
  link2.detach();
  link2 = null;
  
  sRope_cut.play();
}

function drop3() {
  rope3.break();
  link3.detach();
  link3 = null;

  sRope_cut.play();
}


function airBallon() {
  Body.applyForce(fruit, {
    x: 0,
    y: 0
  }, {x: 0.01, y: 0});
}

function muteSound() {
  if(sBackGround.isPlaying()) {
    sBackGround.stop();
  } else {
    sBackGround.play();
  }
}