import vdux from 'vdux/dom'
import {component, element, decodeValue} from 'vdux'
import fire from 'vdux-fire'
import {middleware as firebaseMw} from 'vdux-fire'


 var config = {
    apiKey: "AIzaSyDsUtJI3lDSboIC-ZaWln_UiruO9dq0rrY",
    authDomain: "vduxpractice.firebaseapp.com",
    databaseURL: "https://vduxpractice.firebaseio.com",
    projectId: "vduxpractice",
    storageBucket: "",
    messagingSenderId: "312191289042"
  };

let username;

const TestMiddleware = component({
	  initialState: {
	    email: '',
	    password: '',
	    errorMessage: ''
	  },
	  render({props, state, actions}) {
	    return (
	     <div>
	        <form
	          onSubmit={actions.submit}
	        >

	          <input onKeyUp={decodeValue(actions.updateEmail)} value={state.email}
	            className="new-todo" placeholder="Email" autoFocus/>
	          <input onKeyUp={decodeValue(actions.updatePassword)} value={state.password}
	            className="new-todo" placeholder="Password " autoFocus/>

	        </form>
	        <div>{state.errorMessage}</div>
	        <button onClick={actions.submit(true)}>Login Existing User</button>
	        <button onClick={actions.submit(false)}>Create User</button>
	      </div>
	    )
	  },

	controller: {
		* handleCreateUser({props, state, actions, context}, email, pass){
			var numDigitsInPassword = pass.replace(/[^0-9]/g,"").length
			if(numDigitsInPassword == 0 || pass.length < 6){
				yield actions.clearPassword()
				yield actions.updateErrorMessage("auth/weak-password")
			}
			else {
				var signInFailed = yield context.firebaseSignUp(email, pass)
				if(typeof(signInFailed) == "string"){
					yield actions.updateErrorMessage(signInFailed)
			        yield actions.clearLogin()
				}
				else{
					yield actions.updateErrorMessage("loading")
			        yield props.changeWelcomeName(email.substr(0, email.indexOf("@")))
					var newUser = email.replace(/[.#$]/g,"?")
			        yield props.changeUser(newUser)
			        var newToDo1 = {
			          text:"Exist",
			          completed:true,
			          edit:false
			        }
			        var newToDo2 = {
			          text:"Change the world",
			          completed:false,
			          edit:false
			        }
			        yield props.loginToApp()
			        yield context.firebasePush(`/todos/${newUser}/`, newToDo1)
			        yield context.firebasePush(`/todos/${newUser}/`, newToDo2)
			        // yield context.firebaseUpdate('/todos', {
			        //   value: newValue
			        // })
			        yield actions.clearLogin()
				}
			}
			
		},
		* handleExistingUser({props, state, actions, context}, email, pass){
			var signInFailed = yield context.firebaseSignIn(email, pass)
			if(typeof(signInFailed) == "string"){
				yield actions.updateErrorMessage(signInFailed)
		        yield actions.clearPassword()
			}
			else{
		        yield props.changeWelcomeName(email.substr(0, email.indexOf("@")))
				var newUser = email.replace(/[.#$]/g,"?")
		        yield props.changeUser(newUser)
		        yield props.loginToApp()
		        // yield context.firebaseUpdate('/todos', {
		        //   value: newValue
		        // })
		        yield actions.clearLogin()
			}
			
		},
	    * submit ({state, props, actions,context}, existingUser) {
	        if (!state.email.trim()) {
	          return
	        }
	        var email = state.email.trim()
	    	if(existingUser){
		        yield actions.handleExistingUser(email, state.password)

	    	} else {
		        yield actions.handleCreateUser(email, state.password)
		    }
	    }
	},
	reducer: {
		updateErrorMessage: (state, errorType) => { 
			var errorMessage = "Error: " + errorType
			if(errorType == "auth/wrong-password"){
				errorMessage = "Email and password do not match. Check caps lock and spelling please."
			}
			else if(errorType == "auth/user-not-found"){
				errorMessage = "Email not found. If new user, press the 'Create User' button to create an account."
			}
			else if(errorType == "auth/weak-password"){
				errorMessage = "Weak password detected. Passwords must be at least 6 characters and contain at least 1 digit"
			}
			else if(errorType == "auth/invalid-email"){
				errorMessage = "Incorrect email detected. Make sure to include the domain"
			}
			else if(errorType == "auth/email-already-in-use"){
				errorMessage = "Email already in use. If you're an existing user, click 'Login Existing User' button instead"
			}
			else if(errorType == "loading"){
				errorMessage = "Loading..."
			}
			return{errorMessage}

		},

		clearLogin: (state) => ({
		  email:'',
		  password:''
		}),
		clearPassword: (state) => ({
		  password:''
		}),
		updateEmail: (state, email) => ({
		  email
		}),
		updatePassword: (state, password) => ({
		  password
		}),
	}

})

function wrapEffect (fn) {
  return (model, ...args) => fn(...args)
}

export default 	TestMiddleware