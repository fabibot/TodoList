// import _ from 'lodash';
// import './style.css';
// import Icon from './icon.png';

// const { take } = require("lodash");

// const { countBy } = require("lodash");

let projectList = [];
let idcount = 0;
let idProject = updateId();
function updateId(){
    return 'p' + idcount++;
}
let aProjectIsSelected = false;

const addProjectButton = document.querySelector("#iconeAdd");
addProjectButton.addEventListener("click", () =>{
    createProject();
});
const addTaskButton = document.querySelector(".addTask");
addTaskButton.addEventListener("click", () => {
    displayFormTask();
});



function Project(id, name, tasks){
    this.id = id;
    this.name = name;
    this.tasks = tasks;
}
function Task(ischeck, id, name, description, date, importance){
    this.ischeck = false;
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.importance = importance;
}



let task1 = new Task(false, 'p0', "Faire sa valise", "chausette, lunette de soleil, maillot de bain", 0, 1);
let task2 = new Task(false, 'p0', "PassePort", "Retrait à la poste", 0, 2);
taskList = [task1, task2];

let project1 = new Project(idProject, "voyage Colombie", taskList);
idProject = updateId();
projectList.push(project1);
const divProject1 = document.querySelector("#p0");
divProject1.addEventListener("click", () =>{
    displayTasks(divProject1);
});
const recyclingIcone = document.querySelector(".deleteProjectIcone")
recyclingIcone.addEventListener("click", () =>{
    deleteElement(divProject1);
})

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
            let project = new Project(idProject, input.value, []);
            projectList.push(project);
            divProject.setAttribute("id", idProject);
            idProject = updateId();
            divProject.replaceChild(h4, input);
            let recyclingIcone = document.createElement('div');
            recyclingIcone.classList.add("deleteProjectIcone");
            divProject.appendChild(recyclingIcone);
            recyclingIcone.addEventListener("click", () =>{
                deleteElement(divProject);
            })
            divProject.addEventListener("click", () =>{
                displayTasks(divProject);
            });
        }
    });
}

let currentProjectId = '';
function displayTasks(project){
    let allproject = document.querySelectorAll(".project");
    allproject.forEach((element) => element.style.border = "none");
    project.style.border = "solid 3px black";
    aProjectIsSelected = true;
    let id = project.getAttribute('id');
    const projectFound = projectList.find((element) => element.id == id);
    currentProjectId = id;
    const tasksMainDiv = document.querySelector('.tasksDiv');
    let oldtask = document.querySelectorAll(".task");
    oldtask.forEach((element) => tasksMainDiv.removeChild(element));
    if(projectFound.tasks){
        for (const element of projectFound.tasks){
            createTask(element);
        }
    } else {
        console.log("pas de tache pour le moment");
    }   
}


function createTask(task){
    const tasksMainDiv = document.querySelector('.tasksDiv');
    let taskDiv = document.createElement('div');
    let div1 = document.createElement('div');
    taskDiv.classList.add("task");
    let checkdiv = document.createElement('div');
    checkdiv.classList.add('checkbox'); 
    checkdiv.addEventListener("click", () =>{
        taskDiv.classList.add("checked");
        task.ischeck = true;
    }) 
    let h4 = document.createElement('h4');
    h4.textContent = task.name;
    div1.appendChild(checkdiv);
    div1.appendChild(h4);
    taskDiv.appendChild(div1);
    let div2 = document.createElement('div');
    div2.classList.add('descTask');
    let p = document.createElement('p');
    p.textContent = task.description;
    div2.appendChild(p)
    if(task.importance == 2){
        taskDiv.style.border = "solid 2px orange";
    }
    if(task.importance == 3){
        taskDiv.style.border = "solid 2px red";
    }
    if(task.ischeck){
        taskDiv.classList.add("checked");
    }
    let iconeModify = document.createElement("div");
    iconeModify.classList.add("modifyTask");
    iconeModify.addEventListener("click", () =>{
        modifyTask(taskDiv, task);
    })
    div2.appendChild(iconeModify);
    taskDiv.appendChild(div2);
    tasksMainDiv.appendChild(taskDiv);
    return taskDiv;
}

let aFormIsOpen = false;
function displayFormTask(inputValue){
    if (aProjectIsSelected && !aFormIsOpen){
        const tasksMainDiv = document.querySelector('.tasksDiv');
        let labels = ["Title", "Description", "Date d'échéance", "importance(1,2 ou3)"];
        let ids = ['title', 'description', 'date', 'importance']
        let form = document.createElement('form');
        form.classList.add('task');
        for (let i = 0; i < labels.length; i++){
            let label = document.createElement('label');
            label.textContent = labels[i];
            let input = document.createElement('input');
            input.setAttribute("id", ids[i]);
            if(!inputValue){
                input.setAttribute('value', "");
            } else {
                input.setAttribute('value', inputValue[i + 2]);
            }
            let br = document.createElement('br');
            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(br);
        }
        let button = document.createElement("button");
        button.textContent = "Valider";
        button.addEventListener('click', (event) => {
            event.preventDefault();
            addATask(tasksMainDiv, form, inputValue);
        })
        form.appendChild(button);
        tasksMainDiv.appendChild(form);
        aFormIsOpen = true;
    }
}

function modifyTask(taskDiv, task){
    let inputText = [];
    for (const property in task) {
        inputText.push(task[property])
      }
    const mainDiv = document.querySelector(".tasksDiv")
    mainDiv.removeChild(taskDiv);
    displayFormTask(inputText);
    // let currentProject = projectList.find((element) => element.id == currentProjectId);
    // let rangTask = currentProject.task.find((element) => element == task);
    // currentProject.tasks[rangTask] = "new taks to add";
    //supri l'éménet du tableau de table et puis ajouter dans la [i] la nouvelle stage (en fait pas besoin de sup, mais direction écraser l'ancienne valeur avec """="=)
}

function addATask(mainDiv, form, inputValue){
    let title = document.querySelector("#title");
    let description = document.querySelector("#description");
    let date = document.querySelector("#date");
    let importance = document.querySelector('#importance');
    let task = new Task(false, currentProjectId, title.value, description.value, date.value, importance.value);
    let currentProject = projectList.find((element) => element.id == currentProjectId);
    if(!inputValue){
        currentProject.tasks.push(task);
    } else{
        // let taskToModify = currentProject.tasks.find((rang) => tasks[rang] == inputValue);
        for (let i = 0; i < currentProject.tasks.length; i++){
            console.log(currentProject.tasks[i]);
            if( currentProject.tasks[i] == task.id){
                let taskTrouvé = i;
            }
        }
        // console.log(inputValue);
        // console.log(taskToModify);

        
    }
    
    mainDiv.removeChild(form);
    aFormIsOpen = false;
    createTask(task);
}

function deleteElement(div){
    const projectListDiv = document.querySelector('.projectList');
    projectListDiv.removeChild(div);    
}

