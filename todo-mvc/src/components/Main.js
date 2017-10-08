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
  todos:`/todos/${props.user}#orderByChild=text`
})) (component({
	render ({props, state, actions}) {
		if(true){
		    return (
		    	<div>
					<section className="main">
						<MarkAllButton {...props} todos={props.todos}/>
						<TodoList {...props}  todos={props.todos}/>
					</section>
				</div>
			  )
		} else {
			return (<span/>)
		}
	}

}))

export default 	Main