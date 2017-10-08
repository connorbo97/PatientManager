import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import TodoList from './TodoList'
import MarkAllButton from './MarkAllButton'

/*
	<MarkAllCompletedButton/>
	<VisibleTodoList/>
*/
const BottomText = component({
	render(){
		return (
		  <footer className="info">
		      <p>Double-click to edit a todo</p>
		      <p>Created by <a href="http://github.com/connorbo97">Connor</a></p>
		      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		    </footer>
			)
	}
})

export default BottomText