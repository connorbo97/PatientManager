import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import AddToDo from './AddTodo'


const Header = component({

  render ({props, state, actions}) {
    return (
		<div>
		    <header className="header">
			    <h1>todos</h1>
			    <AddToDo {...props} />
			</header>
		</div>
	  )
  },

  reducer:{

  }
})

export default Header