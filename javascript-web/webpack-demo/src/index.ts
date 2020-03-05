// Class
class Tasks {
  constructor() {
    this.list = [];
    this.counterId = this.list.length;
  };
  list: Array<Task>;
  counterId: number;

  addTask(task: Task) {
    this.counterId++;
    this.list.push(task);
    return true;
  }

  removeTask(task: Task) {
    let encontrado = false;
    let contador = 0;
    while (!encontrado && contador < this.counterId) {
      if (this.list[contador].id === task.id) {
        this.list.splice(contador, 1);
        encontrado = true;
      }
      contador++;
    }
  }

  copyTasks(tasks: Tasks) {
    this.list = tasks.list;
    this.counterId = tasks.counterId;
  }
};

class Task {
  constructor(name: string, state: string, id: number) {
    this.id = id;
    this.name = name;
    this.state = state;
  }
  id: number;
  name: string;
  state: string;
}


// Elements
const input: HTMLInputElement = document.querySelector('input');
const allButton: HTMLButtonElement = document.querySelector('#allButton');
const pendingButton: HTMLButtonElement = document.querySelector('#pendingButton');
const completedButton: HTMLButtonElement = document.querySelector('#completedButton');
const taskList = document.querySelector('#taskList');
const tasksLeft: HTMLParagraphElement = document.querySelector("#tasksLeft");
const counters: HTMLUListElement = document.querySelector('#counters');
document.getElementById("taskList").style.display = "flex";
document.getElementById("taskList").style.flexDirection = "column";

let countTaskLeft: number = 0;
let pending: Array<Element>;
let tareas: Tasks = new Tasks();

let parseo = parseoJSONTasks();
if(parseo !== null){
  tareas.copyTasks(parseo);
}


view(tareas);
//Events


input.onkeyup = (e) => {

  if (e.key === 'Enter') {
    let tarea: Task = new Task(input.value, "pending", tareas.counterId);
    tareas.addTask(tarea);
    setItemJson(tareas);
    view(tareas);
    //createLi(tareas);
  }
}


/*BUTTON*/

/*ALL*/
allButton.onclick = (e) => {
  if (!allButton.disabled) {
    pendingButton.disabled = false;
    allButton.disabled = true;
    completedButton.disabled = false;
    view(tareas)
  }
}

/*PENDING*/

pendingButton.onclick = (e) => {
  if (!pendingButton.disabled) {
    pendingButton.disabled = true;
    allButton.disabled = false;
    completedButton.disabled = false;
    view(tareas)
  }
}

/*COMPLETE*/
completedButton.onclick = (e) => {
  if (!completedButton.disabled) {
    pendingButton.disabled = false;
    allButton.disabled = false;
    completedButton.disabled = true;
    view(tareas)
  }
}


//Functions

function parseoJSONTasks() {
  var myTasks: Tasks = JSON.parse(localStorage.getItem("tasks"));
  return myTasks;
}

function setItemJson(myTasks: Tasks) {
  localStorage.setItem("tasks", JSON.stringify(myTasks));

}

//Depend of the button option, you can see all tasks, pending task or completed tasks

function view(tareas:Tasks){
  if(allButton.disabled){
    allTask(tareas);
  }
  if(pendingButton.disabled){
    pendingTask(tareas);
  }
  if(completedButton.disabled){
    completedTask(tareas);
  }
}

// Show all task. That create <li> with all task

function allTask(myTasks:Tasks){
  removeElement()
  myTasks.list.forEach(element => {
    createTasks(element);
  });
  tasksLeft.textContent = String("Quedan " + countTask(myTasks) + " tareas");
}

// Show only pending tasks. That create <li> with pending task

function pendingTask(myTasks:Tasks){
  removeElement()
  myTasks.list.forEach(element => {
    if(element.state==="pending"){
      createTasks(element);
    }
  });
  tasksLeft.textContent = String("Quedan " + countTask(myTasks) + " tareas");
}

// Show only completed tasks. That create <li> with completed task

function completedTask(myTasks:Tasks){
  removeElement()
  myTasks.list.forEach(element => {
    if(element.state==="completed"){
      createTasks(element);
    }
  });
  tasksLeft.textContent = String("Quedan " + countTask(myTasks) + " tareas");
}

//this function create the <li> with the text content in the element Task and the drop icon and the event listener

function createTasks(element:Task){

  const li: HTMLLIElement = document.createElement('li');
  li.id = "listInput";
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  if(element.state==="completed"){
    checkbox.checked=true;
  }
  else{
    checkbox.checked=false;
  }

  let span = document.createElement("span");
  span.textContent = element.name;

  let icon = document.createElement("i");
  icon.onclick = () => {
    let modalCO: HTMLCollectionOf<Element> = document.getElementsByClassName("modal-container");
    modalCO[0].className = "modal-container open";

    let btnNo: HTMLElement = document.getElementById("btnNo");
    btnNo.onclick = () => { modalCO[0].className = "modal-container" };

    let btnYes: HTMLElement = document.getElementById("btnYes");
    btnYes.onclick = (e) => {
      tareas.removeTask(element);
      li.remove();
      setItemJson(tareas);
      view(tareas);
      modalCO[0].className = "modal-container";
    }
  };
//when the user click in the task
  span.onclick = () => {
    li.style.display = "none";
    const liChange: HTMLLIElement = document.createElement('li');
    const inputLi: HTMLInputElement = document.createElement('input');


    inputLi.type = "text";
    inputLi.value = span.textContent;

    const iconCheck = document.createElement("i");
    iconCheck.className = "material-icons btn-check";
    iconCheck.textContent = "done";

    liChange.className = "updating";
    liChange.appendChild(inputLi);
    liChange.appendChild(iconCheck);

    li.parentElement.insertBefore(liChange, li);

    iconCheck.onclick = function () {
      span.textContent = inputLi.value;
      element.name = span.textContent;
      li.style.display = "";
      liChange.remove();
      setItemJson(tareas);
      view(tareas);
    }

  }

  //When the user click in the checkbox change task's state
  checkbox.onclick = (e) => {
    if (checkbox.checked) {
      element.state = "completed"
    }
    else {
      element.state = "pending"
    }
    setItemJson(tareas);
    tasksLeft.textContent = String("Quedan " + countTask(tareas) + " tareas");
  }

  icon.className = 'material-icons btn-delete';
  icon.textContent = 'delete_outline';

  div1.appendChild(checkbox);
  div1.appendChild(span);
  div2.appendChild(icon);

  li.appendChild(div1);
  li.appendChild(div2);
  li.style.display = "flex";
  li.style.justifyContent = "space-between"
  li.style.flexDirection = "row;"
  document.getElementById("taskList").appendChild(li);
  input.focus();
  input.value = "";
  setItemJson(tareas);
  tasksLeft.textContent = String("Quedan " + countTask(tareas) + " tareas");
}


//Remove all task
function removeElement() {
  if (taskList.hasChildNodes()) {
    while (taskList.childNodes.length >= 1) {
      taskList.removeChild(taskList.firstChild);
    }
  }
}

//Tasks' counter
function countTask(myTasks:Tasks){
  let count: number = 0;
  myTasks.list.forEach(element => {
    if(element.state==="completed"){
      count++;
    }
  });
  return myTasks.counterId - count;
}

