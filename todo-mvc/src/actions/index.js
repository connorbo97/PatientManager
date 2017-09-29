let nextTodoId = 2
if(localStorage.getItem("id") === null){
  localStorage.setItem("id", 2);
} else {
  nextTodoId = parseInt(localStorage.getItem("id"));
}
export const addTodo = text => {

  localStorage.setItem("id", nextTodoId + 1 )
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}


export const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    id
  }
}


export const toggleEdit = (id, text) => {
  return {
    type: 'TOGGLE_EDIT',
    text: text,
    id
  }
}

export const deleteCompleted = () => {
  return {
    type: 'DELETE_COMPLETED',
    id: -1
  }
}

export const markAllCompleted = () => {
  return {
    type: 'MARKALLCOMPLETED_TODO',
    id: -1
  }
}

export const setVisibilityFilter = filter => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}