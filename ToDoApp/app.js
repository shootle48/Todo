//Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")


//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterOption.addEventListener('click', filterTodo)

//Functions

function addTodo(event) {
    //กันไม่ให้ส่งแบบฟอร์มลง
    event.preventDefault()

    //Todo div
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    //สร้าง li
    const newTodo = document.createElement("li")
    newTodo.innerHTML = todoInput.value
    newTodo.classList.add("todo-item")
    todoDiv.appendChild(newTodo)

    //ใส่ข้อความลงในStorage
    saveLocalTodos(todoInput.value)

    //ปุ่มเช็ค
    const completedButton = document.createElement("button")
    completedButton.innerHTML = '<i class="fas fa-check"></i>'
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton)

    //ปุ่มถังขยะ
    const trashButton = document.createElement("button")
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)

    //รวมลิสต์
    todoList.appendChild(todoDiv)

    //เคลียร์ข้อความ
    todoInput.value = ""
}

function deleteCheck(e) {
    const item = e.target
    //ลบTodo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        //animation
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener('transitionend', function() {
            todo.remove()
        })
    }

    //check mark
    if(item.classList[0] === "completed-btn") {
        const todo = item.parentElement
        todo.classList.toggle("complete")
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex"
                break
            case "completed":
                if(todo.classList.contains("complete")){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = "none"
                }
                break
            case "uncompleted":
                if(!todo.classList.contains("complete")){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = "none"
                }
                break
        }
    })
}


function saveLocalTodos(todo) {
    //check---Hey Do i already have thing in there?
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    //check---Hey Do i already have thing in there?
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    
    todos.forEach(function(todo) {
        //Todo div
        const todoDiv = document.createElement("div")
        todoDiv.classList.add("todo")

        //สร้าง li
        const newTodo = document.createElement("li")
        newTodo.innerHTML = todo
        newTodo.classList.add("todo-item")
        todoDiv.appendChild(newTodo)

        //ปุ่มเช็ค
        const completedButton = document.createElement("button")
        completedButton.innerHTML = '<i class="fas fa-check"></i>'
        completedButton.classList.add("completed-btn")
        todoDiv.appendChild(completedButton)

        //ปุ่มถังขยะ
        const trashButton = document.createElement("button")
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn")
        todoDiv.appendChild(trashButton)

        //รวมลิสต์
        todoList.appendChild(todoDiv)
    })
}

function removeLocalTodos(todo) {
    //check---Hey Do i already have thing in there?
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}



