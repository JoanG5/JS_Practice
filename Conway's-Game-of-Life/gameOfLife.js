const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const playBtn = document.querySelector("#playBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const nextBtn = document.querySelector("#nextBtn");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const border = "black";
const alive = "black";
const dead = "white";
const unitSize = 25;
const row = gameHeight / unitSize;
const col = gameWidth / unitSize;
let running = false;
let born = [];


gameBoard.addEventListener("click", function (e){
    if (!running){
        x = Math.floor((e.clientX - gameBoard.getBoundingClientRect().x - 3) / unitSize) * unitSize;
        y = Math.floor((e.clientY - gameBoard.getBoundingClientRect().y - 3) / unitSize) * unitSize;
        ctx.fillStyle = alive;
        ctx.fillRect(x, y, unitSize, unitSize);
    }
})

playBtn.addEventListener("click", play);
pauseBtn.addEventListener("click", function(e){
    running = false;
})
nextBtn.addEventListener("click", nextTick);
resetBtn.addEventListener("click", reset);

function grid() {
    ctx.strokeStyle = border;
    for(let y = 0; y < row; y++){
        for(let x = 0; x < col; x++){
            ctx.strokeRect(x*unitSize, y*unitSize, unitSize, unitSize)
        }
    }
}

function getColor(x, y) {
    const color = ctx.getImageData(x, y, 1, 1);
    if (color.data[3] === 255){
        return true;
    } return false;
}

function survive(x, y) {
    const directions =[
                        [-1, -1], [0, -1], [1, -1], 
                        [-1, 0],          [1, 0], 
                        [-1, 1], [0, 1], [1, 1]
                    ];
    let alive = 0;

    for (let i = 0; i < directions.length; i++){
        const nearX = (x + directions[i][0] * unitSize + gameWidth) % gameWidth;
        const nearY = (y + directions[i][1] * unitSize + gameHeight) % gameHeight;
        if (nearX < 0 ||  nearX > gameWidth || nearY < 0 ||  nearY > gameHeight){
            continue;
        }
        if (getColor(nearX, nearY)){
            alive++;
        }
    }

    if (alive === 3){
        born.push([x, y]);
    } else if (alive === 2 && getColor(x, y)){
        born.push([x, y]);
    }
}

function newBoard(){
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    for(let i = 0; i < born.length; i++){
        switchColor(born[i][0], born[i][1], true);
    }
    born = [];
}

function switchColor(x, y, status){
    if (status){
        ctx.fillStyle = alive;
    } else {
        ctx.fillStyle = dead;
    }
    ctx.fillRect(x, y, unitSize, unitSize);
}

function play(){
    running = true
    gameRun();
}

function gameRun(){
    if (running){
        setTimeout(() => {
            for(let y = 0; y < row; y++){
                for(let x = 0; x < col; x++){
                    survive(x * unitSize, y * unitSize);
                }
            }
            newBoard();
            grid();
            gameRun();
        }
        , 500);
    }
}

function nextTick(){
    for(let y = 0; y < row; y++){
        for(let x = 0; x < col; x++){
            survive(x * unitSize, y * unitSize);
        }
    }
    newBoard();
    grid();
}

function reset(){
    running = false;
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    grid();
}

grid();
