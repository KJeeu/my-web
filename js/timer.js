document.getElementById('timer').innerHTML = `
    <div class="timer_text">Timer</div>
    <div id="timer_setting" class= "timer_box">
        <form id="timer_form">
            <p class="timer_title"><i class="bi bi-alarm-fill"></i></p>
            <p class="timer_title2">Set the minutes</p>
            <p class="timer_title3">(up to 180 minutes)</p>
            <input type="number" class="timer_input" placeholder="minutes" required/>
            <button type="submit" class="start_btn">start</button>
            <p id="timer_check"></p>
        </form>
    </div>
    <div id="timer_list" class= "timer_box">
        <p class="timer_title"><i class="bi bi-alarm-fill"></i></p>
        <div class="timer_time"></div>
        <div class="timer_btn">
            <button id="stop_btn">restart</button>
            <button id="reset_btn">reset</button>
        </div>
    </div>
`;

const timerSetting = document.getElementById('timer_setting');
const timerInput = document.querySelector('.timer_input');
const timerCheck = document.getElementById('timer_check');

const timerList = document.getElementById('timer_list');
const timer = document.querySelector('.timer_time');
const stopBtn = document.getElementById('stop_btn');
const resetBtn = document.getElementById('reset_btn');

let interval;
let time;

function onTimerBtn(event) {
    event.preventDefault();
    time = Number(timerInput.value) * 60;

    if (time < 60) {
        timerCheck.innerText = `양수로 입력하세요`;
    } else if (time > 10800) {
        timerCheck.innerText = `180분 이상으로 설정할 수 없습니다`;
    } else {
        timerSetting.style.display = 'none';
        timerList.style.display = 'block';
        onStopBtn();
        timer.innerText = `start`;
    }
}

function timeStart() {
    let min = String(Math.floor(time / 60)).padStart(2, "0");
    let sec = String(time % 60).padStart(2, "0");
    time--;
    timer.innerText = `${min} : ${sec}`;

    if (time === 0) {
        clearInterval(interval);
        timer.innerText = `close`;
        timer.style.color = `var(--color-dark-main)`;
        stopBtn.style.display = 'none';
    }
}

function onResetBtn() {
    clearInterval(interval);
    history.go(); //브라우저 새로고침 > 좋은 코드 없나? 
}

function onStopBtn() {
    if (stopBtn.innerText === 'restart') {
        stopBtn.innerText = 'stop';
        interval = setInterval(timeStart, 1000);
    } else {
        stopBtn.innerText = 'restart';
        clearInterval(interval);
    }
}

stopBtn.addEventListener('click', onStopBtn);
timerSetting.addEventListener('submit', onTimerBtn);
resetBtn.addEventListener('click', onResetBtn);
