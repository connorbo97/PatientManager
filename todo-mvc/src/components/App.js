import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import BottomText from './BottomText'
import TestFirebasePush from './TestFirebasePush'
import 'regenerator-runtime/runtime'
import {
  middleware as firebaseMw,
  push as firebasePush,
  update as firebaseUpdate,
  set as firebaseSet,
  transaction as firebaseTransaction
} from 'vdux-fire'
import LoginUser from './LoginUser'

vdux(() => <App />)

 var config = {
    apiKey: "AIzaSyDsUtJI3lDSboIC-ZaWln_UiruO9dq0rrY",
    authDomain: "vduxpractice.firebaseapp.com",
    databaseURL: "https://vduxpractice.firebaseio.com",
    projectId: "vduxpractice",
    storageBucket: "",
    messagingSenderId: "312191289042"
  };


/**
 * App
 */

const App = component({
	initialState: {
		id: 0,
    login: false,
		todos: [],
    visibilityFilter: 'SHOW_ALL',
    user:"defaultUser"
	},
  getContext ({props, actions}) {
    return actions
  },
  render ({state, actions}) {
    if(state.login){
    return (
	  <div>
	    <section class="todoapp">
        <TestFirebasePush {...actions} {...state} />
	   		<Header {...actions} {...state} />
        <Main {...actions} {...state} />
        <Footer {...state} {...actions} />
	   	</section>
      <BottomText/>
	  </div>
	  )
      
    } else {
      return (
        <div>
          <LoginUser {...actions} {...state}/>
        </div>
        )
    }
  },

  middleware: [firebaseMw(config)],

  controller: {
    firebaseSet: wrapEffect(firebaseSet),
    firebasePush: wrapEffect(firebasePush),
    firebaseUpdate: wrapEffect(firebaseUpdate),
    firebaseTransaction: wrapEffect(firebaseTransaction),
  },

  reducer: {
    loginToApp: (state) => {
      return {
          login:!state.login
      }
    },
    setFilter: (state, filter) => {
      return {
          visibilityFilter:filter
      }
    },

    changeUser: (state, user) => {
      return {
        user
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

function wrapEffect (fn) {
  return (model, ...args) => fn(...args)
}