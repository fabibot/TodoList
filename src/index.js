// import _ from 'lodash';
// import './style.css';
// import Icon from './icon.png';

let projectList = [];
const addProjectButton = document.querySelector("#iconeAdd");
addProjectButton.addEventListener("click", () =>{
    createProject();
});
const addTaskButton = document.querySelector(".addTask");
addTaskButton.addEventListener("click", () => {
    displayFormTask();
});

// document.querySelector("#addTheTask").addEventListener("click", function (event) {
//       console.log("Désolé ! preventDefault() ne vous laissera pas cocher ceci.");
//       event.preventDefault();
//     },
//     false,
//   );


function Project(id, name, tasks){
    this.id = 0;
    this.name = name;
    this.tasks = tasks;
}
function Task(id, name, date, description, importance){
    this.id = id;
    this.name = name;
    this.date = date;
    this.description = description;
    this.importance = importance;
}

let task1 = new Task(0, "Faire sa valise", 0, "chausette, lunette de soleil, maillot de bain", 1);
let task2 = new Task(1, "PassePort", 0, "Retrait à la poste", 0);
taskList = [task1, task2];

let project1 = new Project(0, "voyage Colombie", taskList);
projectList.push(project1);
createTask(task1);
createTask(task2);

function createProject(){
    const projectMainDiv = document.querySelector(".projectList");
    let divProject = document.createElement('div');
    let input = document.createElement('input');
    divProject.appendChild(input);
    divProject.classList.add("project");
    projectMainDiv.appendChild(divProject);
    input.addEventListener('keydown', (e) => {
        if (e.key == "Enter"){
            let h4 = document.createElement('h4');
            h4.textContent = input.value;
            let project = new Project(0, input.value, 0);
            projectList.push(project);
            divProject.replaceChild(h4, input);
            divProject.addEventListener("click", () =>{
                displayTasks();
            });
        }
    });
}

function displayTasks(){
    console.log("héhé");
}

function createTask(task){
    const tasksMainDiv = document.querySelector('.tasksDiv');
    let taskDiv = document.createElement('div');
    let nameDiv = document.createElement('div');
    taskDiv.classList.add("task");
    let checkdiv = document.createElement('div');
    checkdiv.classList.add('checkbox');  
    let h4 = document.createElement('h4');
    h4.textContent = task.name;
    nameDiv.appendChild(checkdiv);
    nameDiv.appendChild(h4);
    taskDiv.appendChild(nameDiv);
    let p = document.createElement('p');
    p.textContent = task.description;
    taskDiv.appendChild(p);
    // tasksMainDiv.appendChild(taskDiv);

    return taskDiv;
}

let idForm = 0;
function displayFormTask(){
    const tasksMainDiv = document.querySelector('.tasksDiv');
    let labels= ["Title", "Description", "Date d'échéance"];
    let form = document.createElement('form');
    form.classList.add('task');
    form.setAttribute("id", idForm);
    for (let i = 0; i < labels.length; i++){
        let label = document.createElement('label');
        label.textContent = labels[i];
        let input = document.createElement('input');
        input.setAttribute("name", labels[i]);
        let br = document.createElement('br');
        form.appendChild(label);
        form.appendChild(input);
        form.appendChild(br);
    }
    let button = document.createElement("button");
    button.textContent = "Ajouter";
    button.addEventListener('click', (event) => {
        event.preventDefault();
        addATask();
    })
    form.appendChild(button);
    tasksMainDiv.appendChild(form);
    idForm++;
}

function addATask(){
    const form = document.querySelector('form');
    let e = form.getAttribute('name');
    console.log(e);

    console.log(form);
    console.log(form.get('name'));
   
    


    

}
