document.querySelector('.bottom').innerHTML = `
    <div id="logout">
        <i class="bi bi-door-closed-fill"></i>
        <span class="logout_text">Logout</span>
    </div>
    <div id="mode">   
        <span class="mode_moon">
            <i class="bi bi-moon-fill"></i>
            Dark Mode
        </span>
        <span class="mode_sun">
            <i class="bi bi-brightness-high-fill"></i>
            Right Mode
        </span>
    </div>
    </li>
`;

const bgmain = document.querySelector('.bg_main')
const logout = document.getElementById('logout');
const mode = document.getElementById('mode');
const modeMoon = document.querySelector('.mode_moon');
const modeSun = document.querySelector('.mode_sun');
const main = document.querySelector('.main');

function onLogoutBtn() {
    localStorage.clear();
    history.go();
}

function onModeBtn(event) {
    const onMode = event.target.classList.value;
    paintGreetings(saveUsername, onMode);
    if(onMode === 'mode_moon') {
        modeMoon.style.display = 'none';
        modeSun.style.display = 'inline-block';
        onImage(darkImages);
        bgmain.classList.add('dark');
        main.style.backgroundColor ='rgba(0, 0, 0, 0.7)';
        mode.classList.add('right');
    } else {
        modeSun.style.display = 'none';
        modeMoon.style.display = 'inline-block';
        onImage(sunImages);
        bgmain.classList.remove('dark');
        main.style.backgroundColor ='rgba(242, 243, 247, 0.7)';
        mode.classList.remove('right');
    }
}

logout.addEventListener('click', onLogoutBtn);
mode.addEventListener('click', onModeBtn);