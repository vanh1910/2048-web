var value = [];
var score = 0;

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
	i = random(0,3);
	j = random(0,3);
	while (value[i][j]!=0){
		i = random(0,3);
		j = random(0,3);
	}
	r=random(1,10);
	if (r<10) r=1; else r=2;
	value[i][j]=r*2;
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

function handleKeyDown(event) {
	  // Check which key is pressed
    if (event.key === "ArrowUp") {
        // Run your function for the up arrow key
        action_up();
    } else if (event.key === "ArrowDown") {
        // Run your function for the down arrow key
        action_down();
    } else if (event.key === "ArrowLeft") {
        // Run your function for the left arrow key
        action_left();
    } else if (event.key === "ArrowRight") {
        // Run your function for the right arrow key
        action_right();
    }
    
}



function newgame(){
	reset_board();
	random_newtile();
	random_newtile();
	print2DArray(value);
	gameLoop();
}

function gameLoop() {
	let gameover_status = true;
    if (check_gameover()==false) {
        gameover_status = false;
        console.log(score + " game over\n"); 
        document.removeEventListener("keydown", handleKeyDown);// Khi game over, cập nhật trạng thái
    } else {
        // Thực hiện các hành động cần thiết
        document.addEventListener("keydown", handleKeyDown);
        setTimeout(gameLoop, 100); // Gọi lại gameLoop sau 100ms
    }
}

newgame();
