import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import TodoList from './TodoList'
import MarkAllButton from './MarkAllButton'

/*
	<MarkAllCompletedButton/>
	<VisibleTodoList/>
*/
const Main = component({
	render ({props, state, actions}) {
		if(props.todos.length !== 0){
		    return (
				<section className="main">
					<MarkAllButton {...props}/>
					<TodoList {...props}/>
				</section>
			  )
		} else {
			return (<span/>)
		}
	}

})

export default 	Main