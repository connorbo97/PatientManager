import 'regenerator-runtime/runtime'
import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Router from './Router'
import {
  LoginMiddleware,
  signIn,
  signUp,
  signOut
} from './Cobodux-login'
import {
  middleware as firebaseMw,
  push as firebasePush,
  update as firebaseUpdate,
  set as firebaseSet,
  once as firebaseOnce,
  transaction as firebaseTransaction
} from 'vdux-fire'


vdux(() => <App />)

var config = {
    apiKey: "AIzaSyB1xYJr8_7WPsIQv9rm5hb7022rk8O4YRQ",
    authDomain: "patientpractice-6a05e.firebaseapp.com",
    databaseURL: "https://patientpractice-6a05e.firebaseio.com",
    projectId: "patientpractice-6a05e",
    storageBucket: "patientpractice-6a05e.appspot.com",
    messagingSenderId: "933104345422"
  };

/**
 * App
 */

const App = component({
  initialState: {
    uid:null,
    url:'/',
    welcomeName:"Friend-o"
   },
  getContext ({props, actions,state}) {
    return {
      ...actions,
      uid:state.uid,
      url:state.url
    }
  },
  render ({state, actions}) {
    return <Router {...state} {...actions}/>
  },

  middleware: [firebaseMw(config), LoginMiddleware()],

  controller: {
    firebaseSet: wrapEffect(firebaseSet),
    firebasePush: wrapEffect(firebasePush),
    firebaseUpdate: wrapEffect(firebaseUpdate),
    firebaseTransaction: wrapEffect(firebaseTransaction),
    firebaseOnce: wrapEffect(firebaseOnce),
    firebaseSignIn: wrapEffect(signIn),
    firebaseSignUp: wrapEffect(signUp),
    firebaseSignOut: wrapEffect(signOut),
  },

  reducer: {
    changeWelcomeName: (state, welcomeName) => {
      return {
        welcomeName
      }
    },

    setUID: (state, uid) => {
      console.log(uid)
      return {
        uid
      }
    },
    setURL: (state, url) => {
      return {
        url
      }
    },


  }
})

function wrapEffect (fn) {
  return (model, ...args) => fn(...args)
}