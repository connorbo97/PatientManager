import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import fire from 'vdux-fire'
import Link from './Link'


const Footer = fire((props) => ({
  todos:`/todos/${props.user}#orderByChild=text`
})) (component({
  render({props, state, actions}){
    var {todos} = props
    if(todos.value == null){ return <span/>}
    if(todos.loading){
      return <span></span>
    } else{
      todos = todos.value
      var active = todos.filter(todo =>!(todo.completed)).length
      if(todos.length !== 0) {
        if(todos.length - active !== 0) {       //whether or not anything is completed
          return (<footer className="footer">
              <span className="todo-count"><strong>{active}</strong> item left</span>
              <ul className="filters">
                  <li>
                    <Link filter="SHOW_ALL" {...props} content="All"/>
                  </li>
                  <li>
                    <Link filter="SHOW_ACTIVE" {...props} content="Active"/>
                  </li>
                  <li>
                    <Link filter="SHOW_COMPLETED" {...props} content="Completed"/>
                  </li>
              </ul>
              <button className="clear-completed" data-reactid=".0.2.2" onClick={actions.deleteAllCompleted}>Clear completed</button>
          </footer>
          )
        } else {
          return (<footer className="footer">
              <span className="todo-count"><strong>{active}</strong> item left</span>
              <ul className="filters">
                  <li>
                    <Link filter="SHOW_ALL" {...props} content="All"/>
                  </li>
                  <li>
                    <Link filter="SHOW_ACTIVE" {...props} content="Active"/>
                  </li>
                  <li>
                    <Link filter="SHOW_COMPLETED" {...props} content="Completed"/>
                  </li>
              </ul>
          </footer>
          )
        }
      } else {
        return <span/>
      }
    }
  },

  controller:{
    *deleteAllCompleted({state, props, actions, context}){
      var todos = props.todos.value
      var completedTodos = todos.filter(todo => todo.completed == true)
      yield completedTodos.map(todo => context.firebaseSet(`/todos/${props.user}/${todo.key}/`, null))
    },
  }
}))

export default Footer