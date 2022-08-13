// Select element and assign them to variable
let newTask = document.querySelector('new-task');
let form = document.querySelector('form');
let todoUl = document.querySelector('items');
let completeUl = document.querySelector('complete-list ul');

// Create Task Function
let createTask = function(task){
    let listItem = document.createElement('li');
    let checkBox = document.createElement('input');
    let label = document.createElement('label');

    label.innerText = task;
    checkBox.type = 'checkbox';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

// Add Task Function
let addTask = function(event){
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";
    // Bind the new list item to the incomplete list
    bindInCompleteItems(listItem, completeTask);
}

// Complete Task Function
let completeTask = function(){
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';
    listItem.appendChild(deleteBtn);
    
    let checkBox = listItem.querySelector('input[type="checkbox"]');
    checkBox.remove();
    completeUl.appendChild(listItem);
    bindCompleteItems(listItem, deleteTask);
}

// Delete Task Function
let deleteTask = function(){
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}

// Incomplete to Complete Task Action Function
let bindInCompleteItems = function(taskItem, checkBoxClick){
    let checkBox = taskItem.querySelector('input[type="checkbox"]');
    checkBox.onchange = checkBoxClick;
}

// Task Delete Action Function
let bindCompleteItems = function(taskItem, deleteBtnClick){
    let deleteButton = taskItem.querySelector('delete');
    deleteButton.onclick = deleteBtnClick;
}

// Left Side Element
for(let i = 0; i < todoUl.children.length; i++){
    bindInCompleteItems(todoUl.children[i], completeTask);
}

// Right Side Element
for(let i = 0; i < completeUl.children.length; i++){
    bindCompleteItems(completeUl.children[i], deleteTask);
}

// All Functionality Work
form.addEventListener('submit', addTask);