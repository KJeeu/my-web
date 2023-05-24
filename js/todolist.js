document.querySelector('.todolist_box').innerHTML = `
    <div class="todo_text">To do</div>
    <form id="todo_form">
        <input type="text" id="todo_input" placeholder="Write a To do" maxlength = '22' autofocus required />
    </form>
    <ul id="todo_list"></ul>
`;
const toDoForm = document.querySelector("#todo_form");
const toDoInput = toDoForm.querySelector("#todo_input");
const toDoList = document.querySelector("#todo_list");

const TODOS_KEY = "todos"

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    let li = event.currentTarget.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.classList = 'todoBtn';
    button.innerHTML = '<i class="bi bi-check-lg"></i>';
    button.addEventListener("click", deleteToDo);
    li.append(span, button);
    toDoList.appendChild(li);
}

function hadleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", hadleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
    const parseToDos = JSON.parse(savedToDos);
    toDos = parseToDos;
    parseToDos.forEach(paintToDo);
}