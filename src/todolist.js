const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = toDoForm.querySelector(".toDo"),
  toDoListPend = document.querySelector(".toDoList-pend"),
  toDoListFinished = document.querySelector(".toDoList-finished");

const PEND_LIST = "Pending";
const FINISHED_LIST = "Finished";

let pendToDos = [];
let finishedToDos = [];

function deleteBtn(event) {
  const targetBtn = event.target;
  const targetLi = targetBtn.parentNode;
  if (targetLi.parentNode === toDoListPend) {
    const deletePends = pendToDos.filter(
      (toDos) => toDos.id !== parseInt(targetLi.id)
    );
    toDoListPend.removeChild(targetLi);
    pendToDos = deletePends;
    savePend();
  } else {
    const deleteFinisheds = finishedToDos.filter(
      (toDos) => toDos.id !== parseInt(targetLi.id)
    );
    toDoListFinished.removeChild(targetLi);
    finishedToDos = deleteFinisheds;
    saveFinished();
  }
}

function backPend(event) {
  const targetBtn = event.target;
  const targetLi = targetBtn.parentNode;
  const targetText = targetLi.querySelector("span").innerText;
  toDoListFinished.removeChild(targetLi);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const toDosId = parseInt(targetLi.id);
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteBtn);
  doneBtn.innerText = "O";
  doneBtn.addEventListener("click", finBtn);
  span.innerText = targetText;
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  li.id = toDosId;
  toDoListPend.appendChild(li);
  const finToPendToDos = finishedToDos.filter(
    (fin) => fin.id !== parseInt(targetLi.id)
  );
  finishedToDos = finToPendToDos;
  saveFinished();
  const toDoObj = {
    text: targetText,
    id: toDosId,
    isDone: false,
  };
  pendToDos.push(toDoObj);
  savePend();
}

function finBtn(event) {
  const targetBtn = event.target;
  const targetLi = targetBtn.parentNode;
  const targetText = targetLi.querySelector("span").innerText;
  toDoListPend.removeChild(targetLi);
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const toDosId = parseInt(targetLi.id);
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteBtn);
  backBtn.innerText = "≪";
  backBtn.addEventListener("click", backPend);
  span.innerText = targetText;
  li.appendChild(span);
  li.appendChild(backBtn);
  li.appendChild(delBtn);
  li.id = toDosId;
  toDoListFinished.appendChild(li);
  const pendToFinToDos = pendToDos.filter(
    (fin) => fin.id !== parseInt(targetLi.id)
  );
  pendToDos = pendToFinToDos;
  savePend();
  const finObj = {
    text: targetText,
    id: toDosId,
    isDone: true,
  };
  finishedToDos.push(finObj);
  saveFinished();
}

function savePend() {
  localStorage.setItem("Pending", JSON.stringify(pendToDos));
}

function saveFinished() {
  localStorage.setItem("Finished", JSON.stringify(finishedToDos));
}

function writePendToDos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const doneBtn = document.createElement("button");
  const span = document.createElement("span");
  const toDosId = pendToDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteBtn);
  doneBtn.innerText = "O";
  doneBtn.addEventListener("click", finBtn);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(delBtn);
  li.id = toDosId;
  toDoListPend.appendChild(li);
  const toDoObj = {
    text: text,
    id: toDosId,
    isDone: false,
  };
  pendToDos.push(toDoObj);
  savePend();
}

function writeFinishedToDos(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const backBtn = document.createElement("button");
  const span = document.createElement("span");
  const toDosId = finishedToDos.length + pendToDos.length + 1;
  delBtn.innerText = "X";
  delBtn.addEventListener("click", deleteBtn);
  backBtn.innerText = "≪";
  backBtn.addEventListener("click", backPend);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(backBtn);
  li.appendChild(delBtn);
  li.id = toDosId;
  toDoListFinished.appendChild(li);
  const toDoObj = {
    text: text,
    id: toDosId,
    isDone: true,
  };
  finishedToDos.push(toDoObj);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  writePendToDos(currentValue);
  toDoInput.value = "";
}

function loadPend() {
  const loadedPendToDos = localStorage.getItem(PEND_LIST);
  if (loadedPendToDos !== null) {
    const parsedPend = JSON.parse(loadedPendToDos);
    parsedPend.forEach((toDo) => {
      writePendToDos(toDo.text);
    });
  }
}

function loadFinished() {
  const loadedFinishedToDos = localStorage.getItem(FINISHED_LIST);
  if (loadedFinishedToDos !== null) {
    const parsedFinished = JSON.parse(loadedFinishedToDos);
    parsedFinished.forEach((toDo) => {
      writeFinishedToDos(toDo.text);
    });
  }
}

function init() {
  loadPend();
  loadFinished();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
