import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import { deleteTodo } from '../actions'
import { toggleEdit } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTodoChange: id => {
      dispatch(toggleTodo(id))
    },
    onTodoDelete: id => {
      dispatch(deleteTodo(id))
    },
    onEdit: (id, text) => {
      dispatch(toggleEdit(id, text))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList