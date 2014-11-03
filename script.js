var c=document.getElementById("c");
var ctx=c.getContext("2d");
var snake=[];
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
	snake.unshift(snake.pop());
	switch(dir){
		case 0:
			var ny=snake[1].y-1;
			var nx=snake[1].x;
			if(ny<0 || checkCollision(nx,ny)){
				snake.push(snake.shift());
			}else{
				snake[0].y=ny;
				snake[0].x=nx;
			}
			break;
		case 1:
			var nx=snake[1].x-1;
			var ny=snake[1].y;
			if(nx<0 || checkCollision(nx,ny)){
				snake.push(snake.shift());
			}else{
				snake[0].x=nx;
				snake[0].y=ny;
			}
			break;
		case 2:
			var ny=snake[1].y+1;
			var nx=snake[1].x;
			if(ny>49 || checkCollision(nx,ny)){
				snake.push(snake.shift());
			}else{
				snake[0].y=ny;
				snake[0].x=nx;
			}
			break;
		case 3:
			var nx=snake[1].x+1;
			var ny=snake[1].y;
			if(nx>49 || checkCollision(nx,ny)){
				snake.push(snake.shift());
			}else{
				snake[0].x=nx;
				snake[0].y=ny;
			}
			break;
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
	debounce=false;
},100);

