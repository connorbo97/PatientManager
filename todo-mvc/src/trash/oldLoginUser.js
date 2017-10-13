import vdux from 'vdux/dom'
import {component, element, decodeValue} from 'vdux'
import TodoList from './TodoList'
import MarkAllButton from './MarkAllButton'
import fire from 'vdux-fire'
/*
	<MarkAllCompletedButton/>
	<VisibleTodoList/>
*/
const LoginUser = component({

	  initialState: {
	    value: ''
	  },
	  render({props, state, actions}) {
	    return (
	     <div>
	        <form
	          onSubmit={actions.submit}
	        >

	          <input onKeyUp={decodeValue(actions.update)} value={state.value}
	            className="new-todo" placeholder="Enter username" autoFocus
	          
	          />
	        </form>
	        <button onClick={actions.submit}>Login</button>
	      </div>
	    )
	  },
	  controller: {
	    * submit ({state, props, actions,context}) {
	        if (!state.value.trim()) {
	          return
	        }
	        var val = state.value.trim()
	        yield props.changeUser(val)
	        yield props.loginToApp()
	        // yield context.firebaseUpdate('/todos', {
	        //   value: newValue
	        // })
	        yield actions.submitTextValue('')
	    }
	  },

	  reducer: {
	    submitTextValue: (state, value) => ({
	      value
	    }),
	    update: (state, value) => ({
	      value
	    }),
	  }


})


export default LoginUser