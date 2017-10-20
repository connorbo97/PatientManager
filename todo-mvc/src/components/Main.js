import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import TodoList from './TodoList'
import MarkAllButton from './MarkAllButton'
import Footer from './Footer'
import fire from 'vdux-fire'

/*
	<MarkAllCompletedButton/>
	<VisibleTodoList/>
*/
const Main = fire((props) => ({
  todos:`/todos/${props.uid}/todos#orderByChild=text`
})) (component({
	render ({props, state, actions}) {
	    return (
	    	<div>
				<section class="main">
					<MarkAllButton {...props} todos={props.todos}/>
					<TodoList {...props}  todos={props.todos}/>
				</section>
			</div>
		  )
	}

}))

export default 	Main