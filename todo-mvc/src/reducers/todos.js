 var initialState;
 if(localStorage.getItem("todos-[framework]") == null) {
    initialState = [
      {
        id: 0,
        text: "Taste Javascript",
        completed: true,
        edit: false
      },
      {
        id: 1,
        text: "Buy a unicorn",
        completed: false,
        edit: false
      },
    ];
    localStorage.setItem("todos-[framework]", JSON.stringify(initialState))
  } else {
    initialState = JSON.parse(localStorage.getItem("todos-[framework]"));
    initialState = initialState.map(todo =>
        (todo.edit)
          ? {...todo, edit: false}
          : todo
      )
  }
 
var updatedState
const todos = (state = initialState, action) => {
 
  switch (action.type) {
    case 'ADD_TODO':
      localStorage.setItem("todos-[framework]", JSON.stringify([...state, {id: action.id, text: action.text, completed: false}]))
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
          edit: false
        }
      ]

    case 'MARKALLCOMPLETED_TODO': 
      updatedState = state.map(todo =>
        (true)
          ? {...todo, completed: true}
          : todo
      )
      localStorage.setItem("todos-[framework]", JSON.stringify(updatedState))
      return updatedState

    case 'DELETE_TODO': 
      updatedState = state.filter(todo =>
        (todo.id !== action.id)
      )
      localStorage.setItem("todos-[framework]", JSON.stringify(updatedState))
      return updatedState


    case 'DELETE_COMPLETED': 
      updatedState = state.filter(todo =>
        (!todo.completed)
      )
      localStorage.setItem("todos-[framework]", JSON.stringify(updatedState))
      return updatedState

    case 'TOGGLE_TODO':
      updatedState =  state.map(todo =>
        (todo.id === action.id) 
          ? {...todo, completed: !todo.completed}
          : todo
      )
      localStorage.setItem("todos-[framework]", JSON.stringify(updatedState))
      return updatedState

    case 'TOGGLE_EDIT':
    updatedState =  state.map(todo =>
      (todo.id === action.id) 
        ? {...todo, edit: !todo.edit, text: action.text}
        : todo
    )
    localStorage.setItem("todos-[framework]", JSON.stringify(updatedState))
    return updatedState

    default:
      return state
  }
}

export default todos