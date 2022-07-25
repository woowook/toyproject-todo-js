/* eslint-env browser */

// querySelector - html 요소를 선택할 때 사용되며 가장 첫번째 요소를 선택
// id의 경우 #을 붙이고 class인 경우 .를 붙여서 선택, 태그는 태그 그대로
// Html에서 class 이름이 toDoForm을 찾아서 첫번째 요소를 리턴
const toDoForm = document.querySelector('.toDoForm');
const toDoInput = toDoForm.querySelector('input');
const toDos = document.querySelector('.toDos');
const addTodoButton = document.querySelector('.addBtn');
const todoItem = document.querySelector('.li');

const TODOLIST = 'toDoList'; // 추가
let toDoList = []; // 추가

function loadToDoList() {
  const loadedToDoList = localStorage.getItem(TODOLIST);
  if (loadedToDoList !== null) {
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (const toDo of parsedToDoList) {
      const { text } = toDo; // Const text = toDo;
      paintToDo(text);
      saveToDo(text);
    }
  }
}

function init() {
  loadToDoList(); // 추가
  // https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener
  // https://developer.mozilla.org/ko/docs/Web/Events
  toDoForm.addEventListener('submit', createToDo);
  addTodoButton.addEventListener('click', createToDo);
  todoItem.addEventListener('click', completeTodo);
}

init();

function saveToDo(toDo) {
  const toDoObject = {
    text: toDo,
    id: toDoList.length + 1,
  };
  toDoList.push(toDoObject);
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function createToDo(event) {
  event.preventDefault(); // https://developer.mozilla.org/ko/docs/Web/API/Event/preventDefault
  const toDo = toDoInput.value;
  paintToDo(toDo);
  saveToDo(toDo);
  toDoInput.value = '';
}

function paintToDo(toDo) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const delButton = document.createElement('span');
  delButton.textContent = 'X';
  delButton.classList.add('close');
  delButton.addEventListener('click', delToDo);
  span.innerHTML = toDo;
  li.append(span);
  li.append(delButton);
  li.id = toDoList.length + 1;
  li.addEventListener('click', function () {
    completeTodo(li.id);
  });
  toDos.append(li);
}

function delToDo(event) {
  const { target: button } = event; // Const button = event.target;
  const li = button.parentNode; // ParentNode메서드는 해당 HTML 태그의 부모 태그를 반환한다.
  li.remove();
  toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id)); // Function (toDo) { return toDo.id !== li.id;}
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function completeTodo(id) {
  const item = document.getElementById(id);
  if (item.classList.contains('checked')) {
    item.classList.remove('checked');
  } else {
    item.classList.add('checked');
  }
}
