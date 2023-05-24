document.getElementById('banner').innerHTML = `
    <div id="login"></div>
    <div id="clock"></div>
    <div id="day_box">
        <span class="cal">
            <span id="month" class="cal-show">2</span>
            <span class="cal_line"></span>
            <span class="cal-show-text">month</span>
        </span>
        <span class="cal">
            <span id="day" class="cal-show">20</span>
            <span class="cal_line"></span>
            <span class="cal-show-text">day</span>
        </span>
    </div>
`;

const clock = document.getElementById('clock');
const name = document.getElementById('login');

const toDayDate = new Date();

function paintGreetings(username, mode) {
    if(mode === 'mode_moon'){
        name.innerHTML = `Hello, <br/> ${username} 🌛🦉`;
    } else{
        name.innerHTML = `Hello, <br/> ${username} 🌤️🕊️`;
    }
    
}

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    clock.innerText = `${hours} : ${minutes} : ${seconds}`;
}

document.getElementById('month').innerText = toDayDate.getMonth() + 1;
document.getElementById('day').innerText = toDayDate.getDate();

getClock();
setInterval(getClock, 1000);






