import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, onTodoChange, onTodoDelete, onEdit}) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <Todo key={todo.id} {...todo}
      onChange={() => onTodoChange(todo.id)}
      onDelete={() => onTodoDelete(todo.id)}
      onEdit={(id, text) => onEdit(id, text)}
      />
    ))}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      edit: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onTodoChange: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
}

export default TodoList