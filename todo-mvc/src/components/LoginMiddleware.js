import vdux from 'vdux/dom'
import {component, element, decodeValue} from 'vdux'
import firebase from 'firebase'
import Switch from '@f/switch'
import {
  unsubscribe,
  transaction,
  invalidate,
  subscribe,
  refMethod,
  getLast,
  update,
  push,
  once,
  signIn,
  signUp,
  set
} from './actions'

let db
const LoginMiddleware = (newUser, email, password) =>{
	return mw
}


function mw({dispatch, getState, actions}) {
	return (next) => (action) => {
	    return Switch({
	      [signUp.type]:sign_up,
	      [signIn.type]:sign_in,
	      default: () => next(action)
	    })(action.type, action.payload)

	}
}

function sign_up(payload){
    const {email, pass} = payload
    let result = true
	return firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("Error: " + errorMessage)
			result = false
			return errorCode
			// .s..
		});	
}

function sign_in(payload){
    const {email, pass} = payload
	return firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log("Error " + errorCode + ": " + errorMessage)
		return errorCode;
		// ...
		});
}

export default LoginMiddleware