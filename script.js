var c=document.getElementById("c");
var ctx=c.getContext("2d");
var snake=[];
var food=[25,25];
var dir=3; //0 is up, 1 is left, 2 is down, 3 is right
var debounce=false;
for(var i=0;i<30;i++)snake.unshift({x:i,y:0});
function checkCollision(x,y) {
	for(var i=0;i<snake.length;i++){
		if(snake[i].x==x && snake[i].y==y){
			return true;
		}
	}
}
function move() {
	var nx,ny;
	var ok=true;
	switch(dir){
		case 0:
			ny=snake[0].y-1;
			nx=snake[0].x;
			if(ny<0 || checkCollision(nx,ny)){
				ok=false;
			}
			break;
		case 1:
			nx=snake[0].x-1;
			ny=snake[0].y;
			if(nx<0 || checkCollision(nx,ny)){
				ok=false;
			}
			break;
		case 2:
			ny=snake[0].y+1;
			nx=snake[0].x;
			if(ny>39 || checkCollision(nx,ny)){
				ok=false;
			}
			break;
		case 3:
			nx=snake[0].x+1;
			ny=snake[0].y;
			if(nx>39 || checkCollision(nx,ny)){
				ok=false;
			}
			break;
		default:
			throw "Invalid direction";
			break;
	}
	if(ok){
		var sect;
		if(nx==food[0] && ny==food[1]){
			sect={x:0,y:0};
			do {
				food[0]=Math.floor(Math.random()*40);
				food[1]=Math.floor(Math.random()*40);
			} while(checkCollision(food[0],food[1]))
		}else{
			sect=snake.pop();
		}
		snake.unshift(sect);
		sect.x=nx;
		sect.y=ny;
	}
}
function drawSnake() {
	for(var i=0;i<snake.length;i++){
		ctx.fillRect(snake[i].x*10,snake[i].y*10,10,10);
	}
}
drawSnake();
window.onkeydown=function(e) {
	var d={"Up":0,"ArrowUp":0,"Left":1,"ArrowLeft":1,"Down":2,"ArrowDown":2,"Right":3,"ArrowRight":3}[e.keyIdentifier||e.key];
	if (typeof d=="number" && d%2!=dir%2 && !debounce) {
		dir=d;
		debounce=true;
	}
}
setInterval(function() {
	move();
	ctx.clearRect(0,0,500,500);
	drawSnake();
	ctx.fillRect(food[0]*10+2,food[1]*10+2,6,6);
	debounce=false;
},100);

