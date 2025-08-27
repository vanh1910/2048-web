var value = [];
var score = 0;
var newtile_x, newtile_y;
var changes;

function reset_board() {
	score=0;
	for (let i=0;i<5;++i){
		value[i]=[];
		for (let j=0;j<5;++j){
			value[i][j]=0;
		}
	}

}


function print2DArray(array) {
    for (let i = 0; i < array.length-1; i++) {
        console.log(array[i].slice(0, 4).join(" "));
    }
    console.log("score: " + score + "\n");
}

function swap(a,b){
	let temp=a;
	a=b;
	b=temp;
	return [a,b];
}

function random(l,r) {
	l=Math.ceil(l);
	r=Math.floor(r);
	return Math.floor(Math.random() * (r - l + 1)) + l;
}

function random_newtile(){
	newtile_x = random(0,3);
	newtile_y = random(0,3);
	while (value[newtile_x][newtile_y]!=0){
		newtile_x = random(0,3);
		newtile_y = random(0,3);
	}

	r=random(1,10);
	if (r<10) r=1; else r=2;
	value[newtile_x][newtile_y]=r*2;
}

function check_gameover() {
	let check=false;
	for (let i=0;i<4;++i){
		for (let j=0;j<4;++j){
			if(value[i][j]==value[i][j+1] || value[i][j]==0){
				check=true;
				break;
			}
			if(value[i][j]==value[i+1][j] || value[i][j]==0){
				check=true;
				break;
			}
		}
	}
	return check;
}

function action_left(){
	let moved=false;
	for (let i=0;i<4;++i){
		for (let j=0;j<3;++j){
			if (value[i][j]>0){
				for (let k=j+1;k<4;++k){
					if (value[i][k]>0){
						if (value[i][k]==value[i][j]){
							value[i][j]*=2;
							value[i][k]=0;
							moved=true;
							score += value[i][j];
						}
						break;
					}
				}
			}
		}
		for (let j=0;j<3;++j){
			if (value[i][j]==0){
				for (let k=j+1;k<4;++k){
					if (value[i][k]>0){
						value[i][j]=value[i][k];
						value[i][k]=0;
						moved=true;
						break;
					}
				}
			}
		}
	}
	if (moved){
		random_newtile();
		console.log("left");
		print2DArray(value);
	}else console.log("wrong move\n");
}

function action_up(){
	let moved=false;
	for (let i=0;i<4;++i){
		for (let j=0;j<3;++j){
			if (value[j][i]>0){
				for (let k=j+1;k<4;++k){
					if (value[k][i]>0){
						if (value[k][i]==value[j][i]){
							value[j][i]*=2;
							value[k][i]=0;
							moved=true;
							score += value[i][j];
						}
						break;
					}
				}
			}
		}
		for (let j=0;j<3;++j){
			if (value[j][i]==0){
				for (let k=j+1;k<4;++k){
					if (value[k][i]>0){
						value[j][i]=value[k][i];
						value[k][i]=0;
						moved=true;
						break;
					}
				}
			}
		}
	}
	if (moved){
		random_newtile();
		console.log("up\n");
		print2DArray(value);
	}else console.log("wrong move\n");
}

function action_down(){
	let moved=false;
	for (let i=3;i>=0;--i){
		for (let j=3;j>0;--j){
			if (value[j][i]>0){
				for (let k=j-1;k>=0;--k){
					if (value[k][i]>0){
						if (value[k][i]==value[j][i]){
							value[j][i]*=2;
							value[k][i]=0;
							score += value[j][i];
							moved=true;
						}
						break;
					}
				}
			}
		}
		for (let j=3;j>0;--j){
			if (value[j][i]==0){
				for (let k=j-1;k>=0;--k){
					if (value[k][i]>0){
						value[j][i]=value[k][i];
						value[k][i]=0;
						moved=true;
						break;
					}
				}
			}
		}
	}
	if (moved){
		random_newtile();
		console.log("down\n");
		print2DArray(value);
	}else console.log("wrong move\n");
}

function action_right(){
	let moved=false;
	for (let i=3;i>=0;--i){
		for (let j=3;j>0;--j){
			if (value[i][j]>0){
				for (let k=j-1;k>=0;--k){
					if (value[i][k]>0){
						if (value[i][k]==value[i][j]){
							value[i][j]*=2;
							value[i][k]=0;
							moved=true;
							score += value[j][i];
						}
						break;
					}
				}
			}
		}
		for (let j=3;j>0;--j){
			if (value[i][j]==0){
				for (let k=j-1;k>=0;--k){
					if (value[i][k]>0){
						value[i][j]=value[i][k];
						value[i][k]=0;
						moved=true;
						break;
					}
				}
			}
		}
	}
	if (moved){
		random_newtile();
		console.log("right\n");
		print2DArray(value);
	}else console.log("wrong move\n");
}

let touchStartX = 0, touchStartY = 0;

function handleTouchStart(e) {
    if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }
}

function handleTouchEnd(e) {
    if (e.changedTouches.length === 1) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 30) action_right();
            else if (dx < -30) action_left();
        } else {
            if (dy > 30) action_down();
            else if (dy < -30) action_up();
        }
    }
}

function handleKeyDown(event) {
    const key = event.key.toLowerCase();
    if (key === "arrowup" || key === "w") {
        action_up();
    } else if (key === "arrowdown" || key === "s") {
        action_down();
    } else if (key === "arrowleft" || key === "a") {
        action_left();
    } else if (key === "arrowright" || key === "d") {
        action_right();
    }
}


function newgame(){
	score=0;
	reset_board();
	random_newtile();
	random_newtile();
	print2DArray(value);
	gameLoop();
}

function gameLoop() {
	draw();
	let gameover_status = true;
    if (check_gameover()==false) {
        gameover_status = false;
        console.log(score + " game over\n"); 
        gameover_in_html();
        document.removeEventListener("keydown", handleKeyDown);// Khi game over, cập nhật trạng thái
		document.removeEventListener("touchstart", handleTouchStart, {passive: true});
		document.removeEventListener("touchend", handleTouchEnd, {passive: true});
    } else {
        // Thực hiện các hành động cần thiết
        document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("touchstart", handleTouchStart, {passive: true});
		document.addEventListener("touchend", handleTouchEnd, {passive: true});
        setTimeout(gameLoop, 100); // Gọi lại gameLoop sau 100ms
    }
}



newgame();	



//drawing

function draw() {
	for (let i=1;i<=4;++i){
		for (let j=1;j<=4;++j){
			changes = document.querySelector(".game-container .row:nth-child("+i+") .box:nth-child("+j+")");
			changes.textContent="";
			if (value[i-1][j-1]!=0) {
				changes.textContent = value[i-1][j-1];

			}
			changes.classList=[];
			changes.classList.add("box");
			if (value[i-1][j-1]<10000) changes.classList.add("c"+value[i-1][j-1]);
			else changes.classList.add("csuper");
		}
	}

	let x=newtile_x+1; y=newtile_y+1;
	changes = document.querySelector(".game-container .row:nth-child("+x+") .box:nth-child("+y+")");
	changes.classList.add("newc");

	changes = document.getElementsByClassName("score")[0];
	changes.textContent = "score: "+score;
}

function gameover_in_html() {
    var gameOverElement = document.getElementById("gameover");
    gameOverElement.textContent = "Game Over"; // Set the game over message
    gameOverElement.style.display = "block"; // Show the game over element
}

function retry() {
	if (confirm('Are you sure to play again?')){
		var gameOverElement = document.getElementById("gameover");
    	gameOverElement.textContent = ""; // Set the game over message
    	gameOverElement.style.display = "none";
		newgame();
	}
}