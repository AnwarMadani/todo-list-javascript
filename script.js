var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

const addProjectBtn = document.getElementById('addProject');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const form = document.getElementById('form');
const datePicker = document.getElementById('dueDate');
datePicker.max = yyyy + '/' + mm + '/' + dd;
const container = document.getElementById('container');
let tasks = [];
addProjectBtn.addEventListener("click", openModal);


function openModal(){
    form.reset();
    modal.classList.add('active');
    overlay.classList.add('active');
}

overlay.addEventListener("click", closeModal);

function closeModal(){
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

form.addEventListener("submit",(e) => addTask(e));

function addTask(e){
    e.preventDefault();

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
    console.log(newTask);
    tasks.push(newTask);

    updateTasksUi();
    closeModal();
}

function updateTasksUi(){
    container.innerHTML = '';
    tasks.forEach((task) => {
        if(task.description === ''){
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('task');
            const taskTitle = document.createElement('h3');
            taskTitle.textContent = task.title;
            const taskDueDate = document.createElement('p');
            taskDueDate.textContent = task.dueDate;
            const firstDiv = document.createElement('div');
            firstDiv.classList.add('first');
            taskDiv.classList.add(task.priority);

            firstDiv.appendChild(taskTitle);
            firstDiv.appendChild(taskDueDate);
            taskDiv.appendChild(firstDiv)
            container.appendChild(taskDiv);
        } else {
            const taskDiv = document.createElement('div');
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
            descriptionDiv.appendChild(taskDescription);

            taskDiv.classList.add(task.priority)
            firstDiv.appendChild(taskTitle);
            firstDiv.appendChild(taskDueDate);
            taskDiv.appendChild(firstDiv);
            taskDiv.appendChild(descriptionDiv)
            container.appendChild(taskDiv);
        }
        
    })

}

class Task {
    constructor(title, dueDate, priority, description=''){
        this.title = title,
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    setName(name) {
        this.name = name
    }
    
    getName() {
        return this.name
    }
    
    setDate(dueDate) {
        this.dueDate = dueDate
    }
    
    getDate() {
        return this.dueDate
    }

}

class Project{
    constructor(name){
        this.name = name,
        this.tasks = []
    }

    setName(name){
        this.name = name
    }

    getName(){
        return this.name
    }

    setTasks(tasks){
        this.tasks = tasks
    }

    getTasks(){
        return this.tasks
    }

    getTask(taskName){
        return this.tasks.find((task) => task.getName() === taskName)
    }

    contains(taskName){
        return this.tasks.some((task) => task.getName() === taskName)
    }

    addTask(newTask){
        if(this.tasks.find((task) => task.getName() === newTask.name)) return
        this.tasks.push(newTask)
    }

    deleteTask(taskName){
        this.tasks = this.tasks.filter((task) => task.getName() !== taskName)
    }

    getTasksOfToday(){
        return this.tasks.filter((task) => {
            const taskDate = new Date(task.getDate());
            return taskDate == today
        })
    }

}

class TodoList{
    constructor(){
        this.projects = []
    }

    setProjects(projects){
        this.projects = projects
    }

    getProjects(){
        return this.projects
    }

    getProject(projectName){
        return this.projects.find((project) => project.getName() === projectName)
    }

    contains(projectName){
        return this.projects.some((project) => project.getName() === projectName)
    }

    addProject(newProject){
        if(this.projects.find((project) => project.name === newProject.name)) return
        this.projects.push(newProject);
    }

    deleteProject(projectName){
        const projectToDelete = this.projects.find((project) => project.getName() === projectName)
        this.projects.splice(this.projects.indexOf(projectToDelete), 1);
    }

}

