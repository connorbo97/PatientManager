import {component, element} from 'vdux'


const LogoutButton = component({
	render({props, state, actions}) {
			return(
				<div  >
					<button id="toggle-all" class="log-out"  onClick={actions.logOut}>Log out</button>
				</div>
			)
	},

	controller: {
		* logOut ({props, state,actions,context}) {
			yield context.firebaseSignOut()
			yield context.setUID(null)
			yield context.setURL('/signin')
		},

	}
})


export default LogoutButton