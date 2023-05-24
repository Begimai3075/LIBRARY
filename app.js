const API_URL = 'http://localhost:3500'

 const list = document.querySelector('todo_list')
 const formBtn = document.querySelector('.form_btn')
 const formInput = document.querySelector('.form_inp')
 //! state
let todos = []
let formText = ''
let aditNode = false

//! events

formInput.addEventListener('inpet', ({target:{value}})=>{
    formText = value
})

formBtn.addEventListener('click',(event)=>{
    event.preventDefault()
    if(!aditNode){
        const newTodo = {
            task: formText,
            isComleted: false
        }
        createTodo(newTodo)
        return
    }}
)
document.addEventListener('clic',({target})=>{
    if(event.target.classList.contains('delete_btn')){
    const targetId = +target.id
    deleteTodo(targetId)
}
})
   

//! requset 

getTodos()

async function getTodos() {
    const url = `${API_URL}/todos`
    const todos = await makeRequest(url)
    todolist = todos
    return
    }

async function createTodo(todo){
    const url = `${API_URL}/todos`
    const addedTodo = await makeRequest(erl,'POST',todo)
    todolist = [...todolist,addedTodo]
    render()
}

async function deleteTodo(todoId) {
    const url = `${API_URL}/todos/${todoId}`
    await makeRequest(url,'DELETE')
    todolist = todolist.filter(todo => todo.id !== +todo)
    render()
}

async function completeTodo(todo) {
    const url = `${API_URL}/todos/${todo.id}`
    const changedTodo = await makeRequest(url, 'PATCH', { isCompleted: !todo.isCompleted})
}

async function editTodo (todoId, {task, isCompleted}) {
    const url = `${API_URL}/todos/${todoId}`
    const changedTodo = {
        id: todoId ,
        task: task,
        isCompleted: isCompleted
    }

    const editTodo = await makeRequest(url, 'PUT', changedTodo)
}

//! crud fn

//?read
async function render (){
list.innerHTML = ''

if(!todolist.lengh){
    NodeList.innerHTML = ' залач нету '
    render()
}
todolist.forEach(todo => {
    const li = document.createElement('li')
        li.classList.add('todo_list_item')

        if(todo.isCompleted) {
            li.classList.add('is_completed')
        }

    li.innerHTML = `
            <input id="${todo.id}" class="checkbox" type="checkbox" ${todo.isComleted ? 'checked' : ''}/>
            <span>${todo.task}</span>
            <div class="actions_wrap">
                <button class="edit_btn" id="${todo.id}">Изменить</button>
                <button class="delete_btn" id="${todo.id}">Удалить</button>
            </div>
        `

        list.append(li)
});
}

//! helpers

async function makeRequest (url,method = 'GET', data = null, toastData = null) {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-type': 'aplication/json'
            },
            body: data ? JSON.stringify(data) : null
        })
        if(toastData){
            showToast(toastData?.message,toastData?.type)
        }
        return await response.json()
    } catch(error) {
       showToast('произошла внутренная ошибка','error')
    }
    }

function showToast (message, type= 'info'){
    const toastContainer = document.querySelector('#toast_container')

    const toast = document.createElement('div')
    toast.classList.add('toast', type)
    toast.innerText = message

    toastContainer.append(toast)

    setTimeout(()=>{
        toast.remove()
    },3000)
}


function clearForm(){
    formText = ''
    formInput.value = ''
    
}
