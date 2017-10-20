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
  transaction as firebaseTransaction
} from 'vdux-fire'


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
    uid:null,
    url:'/signin',
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