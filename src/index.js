// import _ from 'lodash';
// import './style.css';
// import Icon from './icon.png';


// const { take } = require("lodash");
// const { countBy } = require("lodash");

displayDate();

let idcount = localStorage.getItem("idcount");
let idTask = localStorage.getItem("idTask");

//pour reset les donnée à décom + commenter les deux ligne juste dessus;
// let idTask = 0;
// let idcount = 0;
// localStorage.setItem("idCount", idcount);
// localStorage.setItem("IdTask", idTask);

let idProject = updateId();
function updateId(){
    idcount =  localStorage.getItem("idCount");
    let re = 'p' + idcount++;
    localStorage.setItem("idCount", idcount);
    return re;
}

let projectList = [];
let aProjectIsSelected = false;
let aFormIsOpen = false;
let currentProjectId = '';

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
function Task(ischeck, id, name, description, importance){
    this.ischeck = false;
    this.id = id;
    this.name = name;
    this.description = description;
    this.importance = importance;
}
const projectObj = {
    liste : projectList
}

/* Juste là un project initial*/
let task1 = new Task(false, idTask++, "Faire sa valise", "chausette, lunette de soleil, maillot de bain", 1);
let task2 = new Task(false, idTask++, "PassePort", "Retrait à la poste", 2);
localStorage.setItem("IdTask", idTask);
taskList = [task1, task2];
let project1 = new Project(idProject, "voyage Colombie", taskList);
idProject = updateId();
projectObj.liste.push(project1);

//reset data
// localStorage.clear();
// const projectObjData = JSON.stringify(projectObj);
// localStorage.setItem("dataProjectList", projectObjData);

const getProjectList = JSON.parse(localStorage.getItem('dataProjectList'));
for (let i = 0; i < getProjectList.liste.length; i++){
    displayProject(getProjectList.liste[i]);
}
function displayProject(project){
    const projectMainDiv = document.querySelector(".projectList");
    let divProject = document.createElement('div');
    divProject.classList.add("project");
    let h4 = document.createElement('h4');
    h4.textContent = project.name;
    divProject.appendChild(h4);
    projectMainDiv.appendChild(divProject);
    divProject.setAttribute("id", project.id);
    let recyclingIcone = document.createElement('div');
    recyclingIcone.classList.add("deleteProjectIcone");
    divProject.appendChild(recyclingIcone);
    recyclingIcone.addEventListener("click", () =>{
        deleteElement(divProject);
    })
    divProject.addEventListener("click", () =>{
        SelectProject(divProject);
    });
}

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
            const getProjectList = JSON.parse(localStorage.getItem('dataProjectList'));
            getProjectList.liste.push(project);
            const projectObjData = JSON.stringify(getProjectList);
            localStorage.setItem("dataProjectList", projectObjData);
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
                SelectProject(divProject);
            });
        }
    });
}


function SelectProject(project){
    aFormIsOpen = false;
    let allproject = document.querySelectorAll(".project");
    allproject.forEach((element) => element.style.border = "none");
    project.style.border = "solid 3px black";
    aProjectIsSelected = true;
    let id = project.getAttribute('id');
    const getProjectList = JSON.parse(localStorage.getItem('dataProjectList'));
    const projectFound = getProjectList.liste.find((element) => element.id == id);
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

function displayFormTask(inputValue){
    if (aProjectIsSelected && !aFormIsOpen){
        const tasksMainDiv = document.querySelector('.tasksDiv');
        let labels = ["Title", "Description", "importance(1,2 ou3)"];
        let ids = ['title', 'description', 'importance']
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
    console.log(inputText);
    console.log(task);
    displayFormTask(inputText);
}

function addATask(mainDiv, form, inputValue){
    let title = document.querySelector("#title");
    let description = document.querySelector("#description");
    let importance = document.querySelector('#importance');
    let task = new Task(false, idTask++, title.value, description.value, importance.value);
    localStorage.setItem("IdTask", idTask);
    const getProjectList = JSON.parse(localStorage.getItem('dataProjectList'));
    let currentProject = getProjectList.liste.findIndex((element) => element.id == currentProjectId);
    console.log(currentProject);
    console.log(getProjectList);
    if(!inputValue){
        getProjectList.liste[currentProject].tasks.push(task);
        const projectObjData = JSON.stringify(getProjectList);
        localStorage.setItem("dataProjectList", projectObjData);
    } else{
        taskIdToFind = inputValue[1];
        for (let i = 0; i < getProjectList.liste[currentProject].tasks.length; i++){
            if( getProjectList.liste[currentProject].tasks[i].id == taskIdToFind){
                getProjectList.liste[currentProject].tasks[i] = task; 
                const projectObjData = JSON.stringify(getProjectList);
                localStorage.setItem("dataProjectList", projectObjData);
            }
        }     
    }
    mainDiv.removeChild(form);
    aFormIsOpen = false;
    createTask(task);
}

function deleteElement(div){
    const projectListDiv = document.querySelector('.projectList');
    IdDiv = div.getAttribute("id");
    const getProjectList = JSON.parse(localStorage.getItem('dataProjectList'));
    let indexTodelete = getProjectList.liste.findIndex((element) => element.id == IdDiv);
    getProjectList.liste.splice(indexTodelete, 1);
    const projectListData = JSON.stringify(getProjectList);
    localStorage.setItem("dataProjectList", projectListData);

    if(IdDiv == currentProjectId){
        const taskDiv = document.querySelector(".tasksDiv");
        let taskToDelete = document.querySelectorAll(".task");
        taskToDelete.forEach((element) => taskDiv.removeChild(element));
    }
    projectListDiv.removeChild(div); 

}

function displayDate(){
    const divDate = document.querySelector('#date');
    const month = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];
    const week = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]
    dateOfTheDay = week[new Date().getDay()] + " " + new Date().getDate() +  " " + month[new Date().getMonth()];
    divDate.textContent = dateOfTheDay;
}