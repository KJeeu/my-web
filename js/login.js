document.querySelector('.login_window').innerHTML = `
    <form id="login_form">
        <p class="login_title">What your name?</p>
        <input type="text" class="login_input" placeholder="name" maxlength="10" autofocus required/>
        <button type="submit" class="login_btn">Login</button>
    </form>
`;


const loginWindow = document.querySelector('.login_window');
const loginInput = document.querySelector('.login_input');
const loginBtn = document.querySelector('.login_btn');


const USERNAME_KEY = 'username';

function onLoginBtn(event) {
    event.preventDefault();  //브라우저의 기본동작(새로고침)을 못하게 함
    loginWindow.style.display = 'none';
    const username = loginInput.value;

    //로컬 스토리지 이용
    localStorage.setItem(USERNAME_KEY, username);

    paintGreetings(username);
}

const saveUsername = localStorage.getItem(USERNAME_KEY);

if (saveUsername === null) {
    loginWindow.addEventListener('submit', onLoginBtn);
} else {
    loginWindow.style.display = 'none';
    paintGreetings(saveUsername);
}