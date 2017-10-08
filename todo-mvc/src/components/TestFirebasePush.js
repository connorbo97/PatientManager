import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import fire from 'vdux-fire'

const TestFirebasePush = component({
	render({actions, state, props, context}) {
		return <button onClick={actions.pushToFirebase({id:1, completed:false, edit:false, text:"i did it"})}>Push to Firebase</button>
	},

	controller:{
		* pushToFirebase ({context}, todo ){
			yield context.firebasePush('/todos/user1', todo)
		}
	}
})

export default TestFirebasePush