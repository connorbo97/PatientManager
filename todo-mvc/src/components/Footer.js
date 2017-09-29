import React from 'react'
import FilterLink from '../containers/FilterLink'
import PropTypes from 'prop-types'
/*

*/


const Footer = ({todos, onClearCompleted}) => {
  var active = todos.filter(todo =>!(todo.completed)).length

  if(todos.length !== 0) {
    if(todos.length - active !== 0) {
      return (<footer className="footer">
          <span className="todo-count"><strong>{active}</strong> item left</span>
          <ul className="filters">
              <li>
                <FilterLink filter="SHOW_ALL">All</FilterLink>
              </li>
              <li>
                <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
              </li>
              <li>
                <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
              </li>
          </ul>
          <button className="clear-completed" data-reactid=".0.2.2" onClick={onClearCompleted}>Clear completed</button>
      </footer>
      )
    } else {
      return (<footer className="footer">
          <span className="todo-count"><strong>{active}</strong> item left</span>
          <ul className="filters">
              <li>
                <FilterLink filter="SHOW_ALL">All</FilterLink>
              </li>
              <li>
                <FilterLink filter="SHOW_ACTIVE">Active</FilterLink>
              </li>
              <li>
                <FilterLink filter="SHOW_COMPLETED">Completed</FilterLink>
              </li>
          </ul>
      </footer>
      )
    }
  } else {
    return (<span/>)
  }
}


Footer.propTypes = {
  todos: PropTypes.array.isRequired,
  onClearCompleted: PropTypes.func.isRequired
}

export default Footer