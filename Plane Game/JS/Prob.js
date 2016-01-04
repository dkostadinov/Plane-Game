
var planeBottom = 0;
var planeLeft = 0;
var step = 5;
var bulletBottom = 0;
var bulletLeft = 0;
var planeWidth = 75;
var planeHeight = 100;
var bulletWidth = 32;
var bulletHeight = 32;
var bulletSpeed = 20;
var enemyLeft = 0;
var enemyStep = 7;
var screenWidth = window.innerWidth * 8/100;
var screenHeight = 950;
var enemyShipWidth = 150;
var enemyShipHeight = 96;
var score = document.getElementById('score');
var scoreCount = 0;
var NumOfBullets = 100;
var move = {
		north: false,
		south: false,
		west: false,
		east: false,
};

var fire = {
		shoot: false,
		collision: false,
}
function handleFire(keyCode,state) {
	if(keyCode == 32) {
		fire.shoot = state;
	}
}

function handleMove(keyCode , state) {
	switch(event.keyCode) {
	case 38:
		move.north = state;
		break;
		
	case 40:
		move.south = state;
		break;
		
	case 37:
		move.west = state;
		break;
		
	case 39:
		move.east = state;
		break;	
		
}
	
	
}
window.addEventListener('DOMContentLoaded',function (){
	var plane = document.getElementById('plane');
	var enemy = document.getElementById('enemyTarget');
	var gameTable = document.getElementById('stage');
	
		document.addEventListener("keydown", function(event){
			
		handleMove(event.keyCode,true);
		
			
		}, false)
		
		document.addEventListener("keyup", function(event){
			
			handleMove(event.keyCode,false);
		}, false)
		
		function movePlayer(){
			if (move.north && planeBottom < window.innerHeight / 2){
				planeBottom += step;
				
			}
			
			if (move.south && planeBottom > 0){
				planeBottom -= step;
				
			}
			
			if (move.west && planeLeft > 0){
				planeLeft -= step;
			}
			
			if (move.east && planeLeft < window.innerWidth - 100){
				planeLeft += step;
			}
			plane.style.bottom = planeBottom + 'px';
			plane.style.left = planeLeft + 'px';
			requestAnimationFrame(movePlayer);
		};
		
		movePlayer();
		
		function moveEnemy() {
			if(enemyLeft > window.innerWidth - screenWidth - enemyShipWidth) {
				enemyStep = -enemyStep;
				
			}
			else if(enemyLeft < 0) {
				enemyStep = - enemyStep;
			}
			enemyLeft += enemyStep;
			enemy.style.left = enemyLeft + 'px';
			requestAnimationFrame(moveEnemy);
		}
		moveEnemy();
		 
		 var bullet = document.getElementById("bullet");
		 
		 document.addEventListener('keypress', function (e){
			 handleFire(e.keyCode,true);
		 }, false)
		 
		function shoot() {
			if(fire.shoot){
				bullet.style.visibility = "visible";
				bullet.style.bottom = bulletBottom + 'px';
				bulletLeft = planeLeft + planeWidth / 2 - bulletWidth / 2;
				bullet.style.left = bulletLeft + 'px';
				bulletBottom += bulletSpeed;
			}
			
			if(bulletBottom > window.innerHeight || fire.collision) {
				bulletBottom = planeBottom + planeHeight;
				fire.shoot = false;
				bullet.style.visibility = "hidden";
				fire.collision = false;
				NumOfBullets--;
				bullets.innerHTML = "Bullets:" + NumOfBullets;
			}
			
			
			if(bulletLeft > enemyLeft && bulletLeft < enemyLeft + enemyShipWidth 
					&& bulletBottom > screenHeight - enemyShipHeight) {
				fire.collision = true;
				scoreCount++;
				score.innerHTML = "Score:" + scoreCount;
		 	}
			
		
			window.requestAnimationFrame(shoot);
		}
		shoot();
		
		
},false)



			


