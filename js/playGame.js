document.getElementById('play_game').innerHTML = `
    <div class="play_game_text">PlayGame</div>
    <div class="play_game_before">
        <i class="bi bi-joystick"></i>
        <p class="timer_title2">Tetris Game</p>
        <button class="start_btn">start</button>
    </div>
    <div class="score">0</div>
    <div class="play_game_image">
        <div class="game">
            <span>GameOver</span>
            <button>reset</button>
        </div>
        <div class="playground">
            <ul></ul>
        </div>
    </div>
`;

import BLOCKS from './block.js';
const playGameText = document.querySelector('.play_game_text');
const playGameBefore = document.querySelector('.play_game_before');
const startBtn = document.querySelector('.play_game_before > button');
const playground = document.querySelector('.playground > ul');
const game = document.querySelector('.game');
const scoreDisplay = document.querySelector('.score')
const reset = document.querySelector('.game > button')

const GAME_ROWS = 7;
const GAME_COLS = 12;

let score = 0;
let dur = 600;
let down;
let temp;

const moving = {
    type: "",
    direction: 1,
    top: 0,
    left: 0,
}

function init(){
    //script 호출 시 시작되는 함수
    temp = { ...moving };
    for(let i = 0; i < GAME_ROWS; i++){
        prependNewLine();
    }
    generate();
    playGameText.style.display = 'none';
    scoreDisplay.style.display = 'block';
}

function prependNewLine(){
    const li = document.createElement('li');
    const ul = document.createElement('ul');
    for(let j = 0; j < GAME_COLS; j++){
        const ma = document.createElement('li');
        ul.prepend(ma); //prepend는 첫번째 요소로 추가. 그 반대는 appendChild
    }
    li.prepend(ul);
    playground.prepend(li);
}

function renderBlocks(moveType=""){
    const { type, direction, top, left } = temp;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })

    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        //빈여백을 체크해서 밖으로 안 벗어나게 하기 위해. 아래 블럭이 있는지 업는지 체크도 해야함
        const isAuailable = checkEmpty(target);
        if(isAuailable){
            target.classList.add(type, "moving");
        } else {
            temp = { ...moving }
            if(moveType === 'retry'){
                clearInterval(down);
                showGameOver();
                return;
            }
            //아래는 잠깐 빼놨다가 실행이 된 후에 집어넣기 때문에 스택이 무한정으로 불러지는 현상 방지
            setTimeout(() => {
                renderBlocks('retry');
                //바닥에 닿았다면
                if(moveType === "top") {
                    seizeBlock();
                }
            }, 0)
            // renderBlocks(); //재귀함수사용시 콜스택맥시멈 등의 에러 발생할 수 있음
            return true;
        }
    })

    moving.left = left;
    moving.top = top;
    moving.direction = direction;
}

function seizeBlock(){
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch();
}

function checkMatch(){
    
    const childNodes = playground.childNodes;
    childNodes.forEach(c=>{
        let matched = true;
        c.children[0].childNodes.forEach(li => {
            if(!li.classList.contains("seized")){
                matched = false;
            }
        })

        if(matched){
            c.remove();
            prependNewLine();
            score++;
            scoreDisplay.innerHTML = score;
        }
    })
    generate();

}

function generate(){

    clearInterval(down);
    down = setInterval(()=>{
        moveBlock('top', 1);
    }, dur)

    //여러종류모양 가져오기
    //오브젝트 반복문 돌림 entries
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);

    moving.type = blockArray[randomIndex][0];
    moving.top = 0;
    moving.left = 3;
    moving.direction = 0;
    temp = {...moving};
    renderBlocks();
}

function checkEmpty(target){
    if(!target || target.classList.contains('seized')){
        return false;
    }
    return true;
}

function moveBlock(moveType, amount){
    temp[moveType] += amount;
    renderBlocks(moveType);
}

function changeDir(){
    const dir = temp.direction;
    dir === 3 ? temp.direction = 0 : temp.direction += 1;
    renderBlocks();
}

//빠르게 내려오기
function dropBlock(){
    clearInterval(down);
    down = setInterval(() => {
        moveBlock("top", 1);
    })
}

function showGameOver(){
    game.style.display = "flex"
}

document.addEventListener("keydown", e => {
    switch (e.keyCode){
        case 39: //오른쪽
            moveBlock("left",1);
            break;
        case 37: //왼쪽
            moveBlock("left",-1);
            break;
        case 40: //밑
            moveBlock("top", 1);
            break;
        case 38:
            changeDir();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break;
    }
})

startBtn.addEventListener('click', () => {
    playGameBefore.style.display = 'none';
    init();
})

reset.addEventListener('click', () => {
    playground.innerHTML = '';
    scoreDisplay.innerText = '0';
    
    game.style.display = 'none';
    init();
    // scoreDisplay.style.display = 'none';
    // playGameText.style.display = 'block';
    // playGameBefore.style.display = 'block';
})

