let gameSeq = [];
let userSeq = [];

let btns = ["first","second","third","fourth"];

let started = false;
let level = 0;

h2=document.querySelector('h2');

let allBtns = document.querySelectorAll(".btn")
for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}

document.addEventListener('keypress',function(){
    if(started == false){
        started = true;

        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;
    
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);    // random btn choose
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn){
    btn.classList.add('flash');
    setTimeout(function(){
        btn.classList.remove('flash');
    },250);
}

function userFlash(btn){
    btn.classList.add('userflash');
    setTimeout(function(){
        btn.classList.remove('userflash');
    },250);
}

function checkAns(idx){

    if (userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    } else {
        h2.innerHTML = `Game Over ! Your score was <b>${level}</b><br>
        Press any key to start the game`;
        document.querySelector("body").style.backgroundColor='red';
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor='white';
        },150);

        updateHighScore();
        reset();
    }
}

let high = 0;
let highScore = document.querySelector('.high')

function updateHighScore(){
    if(level > high){
        high = level;
        highScore.innerHTML = `<h3>High Score : ${high}</h3>`;
    }
}

function btnPress(){
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}