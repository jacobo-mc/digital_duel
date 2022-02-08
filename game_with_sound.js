function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
backgroundMusic=new sound('music.wav')
backgroundMusic.sound.setAttribute('loop',true)
backgroundMusic.play()
document.write("<p id=\"p1score\">P1: 0</p><BR/><p id=\"p2score\">P2: 0<\/p><canvas width=\"500\" height=\"400\"id=\"canvas\"></canvas>");
var game_stop=false
var Key = {
  _pressed: {},
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
	W: 87,
	A: 65,
	S: 83,
	D: 68,
	SPACE: 32,
	F: 70,
  isDown: function(keyCode) {
    return this._pressed[keyCode];
  },
  onKeydown: function(event) {
    this._pressed[event.keyCode] = true;
  },
  onKeyup: function(event) {
    delete this._pressed[event.keyCode];
  }
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
const canv=document.getElementById("canvas");
const ctx=canv.getContext('2d');
var playerRect1={x:300,y:200,width:10,height:10}
var playerRect2={x:200,y:300,width:10,height:10}
var player1Score=0
var player2Score=0
function detectRectCollision(rect1,rect2){
	if (rect1.x < rect2.x + rect2.width &&
   rect1.x + rect1.width > rect2.x &&
   rect1.y < rect2.y + rect2.height &&
   rect1.y + rect1.height > rect2.y) {
    return true;
 }else{
	 return false;
 };
};
function detectCircleCollision(circle1,circle2){
	var dx = circle1.x - circle2.x;
	var dy = circle1.y - circle2.y;
	var distance = Math.sqrt(dx * dx + dy * dy);

	if (distance < circle1.radius + circle2.radius) {
    return true;
	}else{
		return false;
	};
};
function detectRectCircleCollision(circle,rect){
    var distX = Math.abs(circle.x - rect.x-rect.width/2);
    var distY = Math.abs(circle.y - rect.y-rect.height/2);

    if (distX > (rect.width/2 + circle.radius)) { return false; }
    if (distY > (rect.height/2 + circle.radius)) { return false; }

    if (distX <= (rect.width/2)) { return true; } 
    if (distY <= (rect.height/2)) { return true; }

    var dx=distX-rect.width/2;
    var dy=distY-rect.height/2;
    return (dx*dx+dy*dy<=(circle.radius*circle.radius));
}
var missles=[]
var shootDir1=1
var shootDir2=1
function draw() {
  if(game_stop){
    return true
  }
	if(Key.isDown(Key.LEFT)){
		playerRect1.x-=10
		shootDir1=1
	}
	if(Key.isDown(Key.RIGHT)){
		playerRect1.x+=10
		shootDir1=2
	}
	if(Key.isDown(Key.DOWN)){
		playerRect1.y+=10
		shootDir1=3
	}
	if(Key.isDown(Key.UP)){
		playerRect1.y-=10
		shootDir1=4
	}
	if(Key.isDown(Key.A)){
		playerRect2.x-=10
		shootDir2=1
	}
	if(Key.isDown(Key.D)){
		playerRect2.x+=10
		shootDir2=2
	}
	if(Key.isDown(Key.S)){
		playerRect2.y+=10
		shootDir2=3
	}
	if(Key.isDown(Key.W)){
		playerRect2.y-=10
		shootDir2=4
	}
	if(Key.isDown(Key.SPACE)){
		missles.push({x:playerRect1.x,y:playerRect1.y,width:1,height:1,dir:shootDir1,active:true});
	}
	if(Key.isDown(Key.F)){
		missles.push({x:playerRect2.x,y:playerRect2.y,width:1,height:1,dir:shootDir2,active:true});
	}
	if(detectRectCollision(playerRect1,playerRect2)){
		playerRect1.x-=10;
		playerRect2.x+=10;
	}
	if(player1Score>=100){
		confirm("Player 1 Wins!!!")
    game_stop=true  
		location.reload();
	}
	if(player2Score>=100){
		confirm("Player 2 Wins!!!")
    game_stop=true
		location.reload()
	}
	ctx.clearRect(0,0,canv.width,canv.height);
	ctx.fillStyle='black';
  ctx.fillRect(playerRect1.x,playerRect1.y,playerRect1.width,playerRect1.height);
	ctx.fillStyle='red';
	ctx.fillRect(playerRect2.x,playerRect2.y,playerRect2.width,playerRect2.height);
	for(i=0;i<missles.length;i++){
		if(missles[i].active==true){
			if(missles[i].dir==1){
				missles[i].x-=10;
			}else if(missles[i].dir==2){
				missles[i].x+=10;
			}else if(missles[i].dir==3){
				missles[i].y+=10;
			}else if(missles[i].dir==4){
				missles[i].y-=10;
			}
			if(detectRectCollision(playerRect1,missles[i])){
				player2Score+=1;
				document.getElementById('p2score').innerText='P2:'+player2Score;
				missles[i].active=false;
			}
			if(detectRectCollision(playerRect2,missles[i])){
				player1Score+=1;
				document.getElementById('p1score').innerText='P1:'+player1Score;
				missles[i].active=false;
			}
			ctx.fillRect(missles[i].x,missles[i].y,missles[i].width,missles[i].height);
		}
	}
}
setInterval(draw, 100);
