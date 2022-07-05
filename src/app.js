/* eslint-env browser */
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector(".toDos");

const TODOLIST = "toDoList";
let toDoList = [];

function loadToDoList() {
  // https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage
  const loadedToDoList = localStorage.getItem(TODOLIST);
  if (loadedToDoList !== null) {
    // JSON.parse - String 객체를 json 객체로 변환
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (const toDo of parsedToDoList) {
      const { text } = toDo;
      paintToDo(text);
      saveToDo(text);
    }
  }
}

function saveToDoList() {
  // 브라우저에 key-value 값을 storage에 저장
  // setItem(key, value) - 아이템 추가
  // getItem(key) - 아이템을 읽기 위해 사용
  // JSON.stringify - json 객체를 String 객체로 변환
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function saveToDo(toDo) {
  const toDoObject = {
    text: toDo,
    id: toDoList.length + 1,
  };
  toDoList.push(toDoObject);
  saveToDoList();
}

function delToDo(event) {
  const { target: button } = event;
  const li = button.parentNode;
  li.remove();
  toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id));
  saveToDoList();
}

function createToDo(event) {
  event.preventDefault();
  const toDo = toDoInput.value;
  paintToDo(toDo);
  saveToDo(toDo);
  toDoInput.value = "";
}

function paintToDo(toDo) {
  // JS에서 html 요소를 생성하기 위해 createElement 사용 (li, span)
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delButton = document.createElement("button");
  delButton.classList.add("delBtn");
  // DelButton.innerText = 'Del';
  // https://developer.mozilla.org/ko/docs/Web/API/Node/textContent
  delButton.textContent = "Del";
  delButton.addEventListener("click", delToDo);
  span.innerHTML = toDo;
  li.append(span);
  li.append(delButton);
  li.id = toDoList.length + 1;
  toDos.append(li);
}

function init() {
  loadToDoList();
  toDoForm.addEventListener("submit", createToDo);
}

init();
