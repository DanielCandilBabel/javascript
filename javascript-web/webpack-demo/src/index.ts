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
    let index = -1;
    while (!encontrado && contador < this.counterId) {
      if (this.list[contador].id === task.id) {
        index = contador;
        encontrado = true;
      }
      contador++;
    }
    if (index !== -1) {
      alert(index);
      this.counterId--;
      this.list.splice(index, 1);
      return true;
    }
    return false;
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
let countTaskLeft: number = 0;
let pending: Array<Element>;
let tareas:Tasks = new Tasks();
//Events

input.onkeyup = (e) => {

  if (e.key === 'Enter') {
    countTaskLeft++;

    const li: HTMLLIElement = document.createElement('li');
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");

    document.getElementById("taskList").style.display = "flex";
    document.getElementById("taskList").style.flexDirection = "column";

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let span = document.createElement("span");
    span.textContent = input.value;



    let tarea:Task = new Task(span.textContent, "completed", tareas.counterId);
    tareas.addTask(tarea);

    setItemJson(tareas);

    let icon = document.createElement("i");
    icon.onclick = () => {
      let modalCO: HTMLCollectionOf<Element> = document.getElementsByClassName("modal-container");
      modalCO[0].className = "modal-container open";

      let btnNo: HTMLElement = document.getElementById("btnNo");
      btnNo.onclick = () => { modalCO[0].className = "modal-container" };

      let btnYes: HTMLElement = document.getElementById("btnYes");
      btnYes.onclick = (e) => {
        tareas.removeTask(tarea);
        li.remove();
        modalCO[0].className = "modal-container";
        countTaskLeft--;
        tasksLeft.textContent = String("Quedan " + countTaskLeft + " tareas");
      }
    };

    span.onclick = () => {
      li.style.display = "none";
      const liChange: HTMLLIElement = document.createElement('li');
      const inputLi: HTMLInputElement = document.createElement('input');
      liChange.className = "updating";
      inputLi.type = "text";
      const iconCheck = document.createElement("i");
      iconCheck.className = "material-icons btn-check";
      iconCheck.textContent = "done";
      inputLi.value = span.textContent;
      liChange.appendChild(inputLi);
      liChange.appendChild(iconCheck);
      li.parentElement.insertBefore(liChange, li);
      iconCheck.onclick = function () {
        span.textContent = inputLi.value;
        li.style.display = "";
        liChange.remove();
      }

    }

    checkbox.onclick = (e) => {
      if (checkbox.checked) {
        countTaskLeft--;
        tarea.state="pending"
      }
      else {
        tarea.state="completed"
        countTaskLeft++;
      }
      tasksLeft.textContent = String("Quedan " + countTaskLeft + " tareas");
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
    tasksLeft.textContent = String("Quedan " + countTaskLeft + " tareas");
  }
}

/*BUTTON*/

/*ALL*/
allButton.onclick = (e) => {
  if (!allButton.disabled) {
    pendingButton.disabled = false;
    allButton.disabled = true;
    completedButton.disabled = false;
  }
}

/*PENDING*/

pendingButton.onclick = (e) => {
  if (!pendingButton.disabled) {
    pendingButton.disabled = true;
    allButton.disabled = false;
    completedButton.disabled = false;
  }
}

/*COMPLETE*/
completedButton.onclick = (e) => {
  if (!completedButton.disabled) {
    pendingButton.disabled = false;
    allButton.disabled = false;
    completedButton.disabled = true;
  }
}

// let myTasks = new Tasks();
// let taskprueba = new Task("uno", "completed", 0);

// let taskpruebados = new Task("dos", "pending", 1);

// myTasks.addTask(taskprueba);
// myTasks.addTask(taskpruebados);

//setItemJson(tareas);
// let copia: Tasks = new Tasks();
// let parseo: Tasks = parseoJSONTasks();
// copia.copyTasks(parseo);

// console.log("---------------------------------------------------------------");

// console.log(taskpruebados);

// copia.removeTask(taskpruebados);


// setItemJson(copia);
// console.log(parseoJSONTasks());



//Functions

function parseoJSONTasks() {
  var myTasks: Tasks = JSON.parse(localStorage.getItem("tasks"));
  return myTasks;
}

function setItemJson(myTasks: Tasks) {
  localStorage.setItem("tasks", JSON.stringify(myTasks))
}


