// Обращение к элементам
const todoList = document.querySelector('.todo-list');
const addTaskBtn = document.querySelector('.add-field__btn');
const addTaskInput = document.querySelector('.add-field__text');


// Вывод задач
const tasksDisplay = () => {

    const tasksStorage = JSON.parse(localStorage.getItem("TASKS_STORAGE"))
    const keyStorage = localStorage.getItem("TASKS_STORAGE")

    // Проверка на наличие ключа и данных в ключе
    if (!keyStorage || !tasksStorage.length){
        todoList.innerHTML= `<h1 class="todo-message">У вас нет задач</h1>`
        return
    }

    // Заносим данные
    todoList.innerHTML=``
    tasksStorage.reverse().forEach((item,index) => {
        const todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')
        todoItem.innerHTML = `

        <textarea readonly>${item}</textarea>
            <div class="todo-item__icons">
                <img class="todo-item__icon-remove"
                     src="./assets/icons/trash-icon.svg"
                     alt="trash-icon">
                <img class="todo-item__icon-edit"
                     src="./assets/icons/edit-icon.svg"
                     alt="edit-icon">
                <img class="todo-item__icon-mobile"
                     src="./assets/icons/mobile-ellipse.svg"
                     alt="mobile-ellipse">
            </div>
    `
        todoItem.addEventListener('click', e=>{
            e.target.className === 'todo-item__icon-remove' && removeTask(index);
            e.target.className === 'todo-item__icon-edit' && editTask(index,e)
        })
        todoList.appendChild(todoItem);
    })
}



// Удаление существующих задач
const removeTask = (index) => {
    const tasksStorage = JSON.parse(localStorage.getItem("TASKS_STORAGE"))
    tasksStorage.splice(index, 1);
    localStorage.setItem("TASKS_STORAGE", JSON.stringify(tasksStorage))
    tasksDisplay()
}

// Редактирование существующих задач
const editTask = (index,e) => {
    const tasksStorage = JSON.parse(localStorage.getItem("TASKS_STORAGE"))
    const editText = e.target.parentNode.parentNode.querySelector('textarea');
    editText.removeAttribute('readonly')
    editText.focus()
    editText.selectionStart = editText.value.length // Перевод курсора в конец редактируемого текста
    editText.addEventListener('change', e => {
        tasksStorage[index] = editText.value
        editText.setAttribute('readonly', '')
        localStorage.setItem("TASKS_STORAGE", JSON.stringify(tasksStorage))
        tasksDisplay()
    })
}

// Добавление задач
addTaskBtn.addEventListener('click', e => {

    if (!addTaskInput.value) return

    const tasksStorage = JSON.parse(localStorage.getItem("TASKS_STORAGE"))

    if (!tasksStorage){
        localStorage.setItem("TASKS_STORAGE", JSON.stringify([addTaskInput.value]))
        addTaskInput.value =``
        tasksDisplay()
        return;
    }

    localStorage.setItem("TASKS_STORAGE", JSON.stringify([...tasksStorage, addTaskInput.value]))
    addTaskInput.value =``
    tasksDisplay()
})

window.onload = tasksDisplay
