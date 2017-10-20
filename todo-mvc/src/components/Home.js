import 'regenerator-runtime/runtime'
import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import BottomText from './BottomText'
import LogoutButton from './LogoutButton'


const Home = component({
  initialState: {
    todos: [],
    visibilityFilter: 'SHOW_ALL',
   },

   * onCreate({props}){

   },
	render({props,state,actions, context}){
		return (
			<div>
				<p class="welcome">{props.welcomeName}'s List</p>
				<LogoutButton {...props} {...actions} {...state}/>
				<section class="todoapp">
					<Header {...props} {...actions} {...state} />
					<Main {...props} {...actions} uid={context.uid} {...state} />
					<Footer {...props} {...state} {...actions} />
				</section>
				<BottomText/>
			</div>
		)
	},


  reducer: {
    setFilter: (state, filter) => {
      return {
          visibilityFilter:filter
      }
    },
    addFullToDo: (state, todo) => {
      return {
          todos:[...state.todos, todo]
      }
    },

    deleteToDo: (state, deletedId) => {
      return {
          todos: state.todos.filter(todo => (todo.id !== deletedId))
      }
    },

    toggleEdit: (state, editId, editedText) => {
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

export default Home