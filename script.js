var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

let myTasks = [];
const addTaskBtn = document.getElementById('addTask');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const form = document.getElementById('form');
const datePicker = document.getElementById('dueDate');
datePicker.min = yyyy + '/' + mm + '/' + dd;
const container = document.getElementById('container');

addTaskBtn.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);

function openModal(){
    form.reset();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(){
    modal.classList.remove('active');
    overlay.classList.remove('active');
}


class Task {
    constructor(title, dueDate, priority, description=''){
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
    
    getName() {
        return this.name
    }
    
    
    getDate() {
        return this.dueDate
    }

}

function addTaskToTasks(newTask){
    if(!myTasks.includes(newTask)){
        myTasks.push(newTask);
    }
}

function removeTaskFromTasks(title){
    myTasks = myTasks.filter(task => task.title !== title)
}

function getTask(title){
    return myTasks.find(task => task.title === title)
}


function updateTasksContainer(tasks){
    container.innerHTML = '';
    for(let task of tasks){
        createTaskCard(task);
    }
}

function createTask(){
    const title = document.getElementById('title').value;
    const dueDate = document.getElementById('dueDate').value;
    let description = document.getElementById('description').value;
    let priority;
    if(document.getElementById('low').checked){
        priority = 'low';
    } else if(document.getElementById('normal').checked){
        priority = 'normal';
    } else {
        priority = 'high';
    }

    const newTask = new Task(title, dueDate, priority, description);
    return newTask;
}

function createTaskCard(task){
        const taskDiv = document.createElement('div');
        const leftSideDiv = document.createElement('div');
        const deleteIcon = document.createElement('img');
        deleteIcon.src = './img/delete.png';
        taskDiv.classList.add('task');
        const taskTitle = document.createElement('h3');
        taskTitle.textContent = task.title;
        const taskDueDate = document.createElement('p');
        taskDueDate.textContent = task.dueDate;
        const firstDiv = document.createElement('div');
        firstDiv.classList.add('first');
        const taskDescription = document.createElement('p');
        const descriptionDiv = document.createElement('div');
        taskDescription.textContent = task.description;

        deleteIcon.addEventListener("click", (e) => deleteTask(e))
        
        descriptionDiv.appendChild(taskDescription);
        leftSideDiv.appendChild(deleteIcon);
        leftSideDiv.appendChild(taskTitle);
        firstDiv.appendChild(leftSideDiv);

        taskDiv.classList.add(task.priority)
        firstDiv.appendChild(taskDueDate);
        taskDiv.appendChild(firstDiv);
        taskDiv.appendChild(descriptionDiv)
        container.appendChild(taskDiv);
}

form.addEventListener("submit", (e) => addTask(e));

function deleteTask(e){
    let title = e.target.parentNode.parentNode.firstChild.innerHTML;
    title = title.split('<h3>');
    title = title[1].split('<');
    title = title[0];
    removeTaskFromTasks(title);
    updateTasksContainer(myTasks);
}

function addTask(e){
    e.preventDefault();
    const newTask = createTask()
    addTaskToTasks(newTask);
    updateTasksContainer(myTasks);
    closeModal();
}


// Inbox Button

const inboxBtn = document.getElementById('inbox');
const todayBtn = document.getElementById('today');
let todayTasks = [];

inboxBtn.addEventListener('click', (e) => updateTasksContainer(myTasks));

todayBtn.addEventListener('click', (e) => {
    todayTasks = [];
    myTasks.filter((task) => {
        if(task.getDate() === today){
            if(!todayTasks.includes(task)){
                todayTasks.push(task);
            }
        }});
    updateTasksContainer(todayTasks);
});

