import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import AddToDo from './AddToDo'
import LogoutButton from './LogoutButton'


const Header = component({

  render ({props, state, actions}) {
    return (
		<div>
		    <header class="header">
			    <h1>todos</h1>
			    <AddToDo {...props}/>
			</header>
		</div>
	  )
  },

})

export default Header