import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Todo from './Todo'
import fire from 'vdux-fire'

const TodoList = component({
  render ({props, state, actions}){
    if(props.todos.value == null){
      return <span></span>
    }
    if(props.todos.loading){
      return <span></span>
    } else {
      var visibleToDoList = []
      if(props.visibilityFilter === 'SHOW_ALL'){
        visibleToDoList = props.todos.value
      } else if(props.visibilityFilter === 'SHOW_COMPLETED') {
        visibleToDoList = props.todos.value.filter(todo => (todo.completed))
      } else {
        visibleToDoList = props.todos.value.filter(todo => (!todo.completed))
      }
      return (
        <ul class="todo-list">
          {visibleToDoList.map(todo => (
            <Todo key={todo.key} {...props} keyID={todo.key} {...todo} />
          ))}
        </ul>
      )
    }
  }
})


export default TodoList