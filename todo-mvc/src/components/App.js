import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Header from './Header'
import Main from './Main'
import 'regenerator-runtime/runtime'
vdux(() => <App />)

/**
 * App
 */

const App = component({
	initialState: {
		id: 0,
		todos: [],
    visibilityFilter: 'SHOW_ALL'
	},
  render ({state, actions}) {
    return (
	  <div>
	    <section class="todoapp">
	   		<Header {...actions} {...state} />
        <Main {...actions} {...state} />
	   	</section>
	  </div>
	  )
  },

  reducer: {
    addToDo: (state, todo) => {
    	return {
      		todos:[...state.todos, {id:state.id++, text:todo, completed: false, edit: false}]
    	}
    },


    deleteToDo: (state, deletedId) => {
      return {
          todos: state.todos.filter(todo => (todo.id !== deletedId))
      }
    },

    toggleEdit: (state, editId, editedText) => {
      console.log(editId + " " + editedText)
      return {
          todos: state.todos.map(todo =>
      (todo.id === editId) 
        ? {...todo, edit: !todo.edit, text: editedText}
        : todo
        )
      }
    },

    toggleToDo: (state, toggledId) => {
      return {
          todos:state.todos.map(todo =>
           (todo.id === toggledId) 
          ? {...todo, completed: !todo.completed}
          : todo
      )
      }
    },

    markAllCompleted: (state) => {
      var allCompleted = true
      for(var i=0; i < state.todos.length; i++){
        if(state.todos[i].completed === false){
          allCompleted = false;
          break;
        }
      }
      if(allCompleted){

        for(var i=0; i < state.todos.length; i++){
          document.getElementById("checkbox" + state.todos[i].id).checked = false
        }
        return {
            todos:state.todos.map(todo =>
             (true) 
            ? {...todo, completed: false}
            : todo
           )
        }
      } else {

        for(var i=0; i < state.todos.length; i++){
          document.getElementById("checkbox" + state.todos[i].id).checked = true
        }
        return {
            todos:state.todos.map(todo =>
             (true) 
            ? {...todo, completed: true}
            : todo
           )
        }
      }
    },

  }
})