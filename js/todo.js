const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const todoRemain = document.querySelector(".todo__remain");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDO() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function handleCheck(e) {
  const li = e.target.parentElement;
  if (!li.classList.contains("checked")) {
    li.classList.add("checked");
    toDos = toDos.map(toDo => {
      if (toDo.id === parseInt(li.id)) {
        toDo.check = true;
      }
      return toDo;
    });
  } else {
    li.classList.remove("checked");
    toDos = toDos.map(toDo => {
      if (toDo.id === parseInt(li.id)) {
        toDo.check = false;
      }
      return toDo;
    });
  }
  saveToDO();
  remain(toDos);
}

function deleteToDo(e) {
  const li = e.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
  remain(toDos);
  saveToDO();
}

function paintToDO(newTodoObj) {
  const li = document.createElement("li");
  li.id = newTodoObj.id;
  if (newTodoObj.check) {
    li.classList.add("checked");
  }
  li.innerHTML = `
      <i class="far fa-check-circle"></i>
      <span>${newTodoObj.text}</span>
      <i class="far fa-trash-alt"></i>
  `;
  toDoList.appendChild(li);
  const deleteBtn = li.querySelector(".fa-trash-alt");
  const checkBtn = li.querySelector(".fa-check-circle");
  deleteBtn.addEventListener("click", deleteToDo);
  checkBtn.addEventListener("click", handleCheck);
}

function handleToDOSubmit(e) {
  e.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    check: false,
  };
  toDos.push(newTodoObj);
  remain(toDos);
  paintToDO(newTodoObj);
  saveToDO();
}

function remain(toDos) {
  realToDo = toDos.filter(toDo => toDo.check === false);
  todoRemain.innerText = `남은 일이 ${realToDo.length}개 남았어요`;
}

toDoForm.addEventListener("submit", handleToDOSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
  const parsedToDos = JSON.parse(savedTodos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDO);
  remain(parsedToDos);
}
