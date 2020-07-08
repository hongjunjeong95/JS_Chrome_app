const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const toDoLi = document.createElement("li");
  const toDoDelBtn = document.createElement("button");
  const toDoSpan = document.createElement("span");
  const toDoLiId = toDos.length + 1;
  toDoDelBtn.innerText = "❌";
  toDoDelBtn.addEventListener("click", deleteToDo);
  toDoSpan.innerText = text;
  toDoLi.appendChild(toDoDelBtn);
  toDoLi.appendChild(toDoSpan);
  toDoLi.id = toDoLiId;
  toDoList.appendChild(toDoLi);
  const toDoObj = {
    text: text,
    id: toDoLiId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
