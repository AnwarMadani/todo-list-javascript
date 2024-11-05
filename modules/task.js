export default class Task {
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