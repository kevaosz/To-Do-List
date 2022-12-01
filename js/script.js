const inputElement = document.querySelector('.new-task-input')
const addTaskButton = document.querySelector('.new-task-button')

const tasksContainer = document.querySelector('.tasks-container')

const validateInput = () => inputElement.value.trim().length > 0 // Input valido = aquele que não é vazio 

const handleAddTask = () => {
    const inputIsvalid = validateInput()

    if (!inputIsvalid) {
        return inputElement.classList.add('error') // Caso o input não seja válido
    }

    const taskItemContainer = document.createElement('div')
    taskItemContainer.classList.add('task-item')

    const taskContent = document.createElement('p')
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent))

    const deleteItem = document.createElement('i')
    deleteItem.classList.add('far')
    deleteItem.classList.add('fa-trash-alt')

    deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))

    taskItemContainer.appendChild(taskContent)
    taskItemContainer.appendChild(deleteItem)

    tasksContainer.appendChild(taskItemContainer)

    inputElement.value = '' // Input fica vazio depois de add uma nova tarefa

    updateLocalStorage()
}

const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes // Pega todos os filhos do taskContainer

    
    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)
        if (currentTaskIsBeingClicked) { 
            task.firstChild.classList.toggle('completed')
        }
    }

    updateLocalStorage()
}

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes // Pega todos os filhos do taskContainer

    for (const task of tasks) {
        const currentTaskIsBeingClicked = task.firstChild.isSameNode(taskContent)

        if (currentTaskIsBeingClicked) {
            taskItemContainer.remove()
        }
    }

    updateLocalStorage()
}

const handleInputChange = () => {
    const inputIsvalid = validateInput()

    if(inputIsvalid) {
        return inputElement.classList.remove('error')
    }
}

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild
        const isCompleted = content.classList.contains('completed')

        return {description: content.innerText, isCompleted}
    })

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks))

}

const refreshTasksUsingLocalStorage = () => {
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'))

    if (!tasksFromLocalStorage) return

    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div')
        taskItemContainer.classList.add('task-item')
    
        const taskContent = document.createElement('p')
        taskContent.innerText = task.description
        
        if (task.isCompleted) {
            taskContent.classList.add('completed')
        }
    
        taskContent.addEventListener('click', () => handleClick(taskContent))
    
        const deleteItem = document.createElement('i')
        deleteItem.classList.add('far')
        deleteItem.classList.add('fa-trash-alt')
    
        deleteItem.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent))
    
        taskItemContainer.appendChild(taskContent)
        taskItemContainer.appendChild(deleteItem)
    
        tasksContainer.appendChild(taskItemContainer)
    }
}

refreshTasksUsingLocalStorage()

addTaskButton.addEventListener('click', () => handleAddTask())

inputElement.addEventListener('change', () => handleInputChange())