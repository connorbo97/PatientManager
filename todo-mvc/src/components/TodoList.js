import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Todo from './Todo'

const TodoList = component({
  render ({props, state, actions}){
    var visibleToDoList
    if(props.visibilityFilter === 'SHOW_ALL'){
      visibleToDoList = props.todos
    } else if(props.visibilityFilter === 'SHOW_COMPLETED') {
      visibleToDoList = props.todos.filter(todo => (todo.completed))
    } else {
      visibleToDoList = props.todos.filter(todo => (!todo.completed))
    }
    return (
      <ul class="todo-list">
        {visibleToDoList.map(todo => (
          <Todo key={todo.id} {...todo}
          onChange={() => props.toggleToDo(todo.id)}
          onDelete={() => props.deleteToDo(todo.id)}
          onEdit={(id, text) => props.toggleEdit(id, text)}
          />
        ))}
      </ul>
    )
  }
})


export default TodoList