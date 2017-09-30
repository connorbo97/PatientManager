import {component, element} from 'vdux'



const MarkAllButton = component({
	render({props, state, actions}) {
		return(
			<div  onClick={actions.markAll}>
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label htmlFor="toggle-all">Mark all as complete</label>
			</div>
		)
	},

	controller: {
		* markAll ({props}) {
			yield props.markAllCompleted()
		}
	}
})


export default MarkAllButton