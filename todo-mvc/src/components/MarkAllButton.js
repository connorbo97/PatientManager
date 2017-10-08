import {component, element} from 'vdux'



const MarkAllButton = component({
	render({props, state, actions}) {
		if(props.todos.value == null){return <span/>}
		if(props.todos.loading){
			return <span></span>
		} else {
			if(props.todos.value.length == 0){return <span/>}
			return(
				<div  >
					<input id="toggle-all" className="toggle-all" type="checkbox" onChange={actions.markAll}/>
					<label htmlFor="toggle-all">Mark all as complete</label>
				</div>
			)
		}
	},

	controller: {
		* markAll ({props, state,actions,context}) {
			var todos = props.todos.value

			yield todos.map(todo => context.firebaseUpdate(`/todos/${props.user}/${todo.key}/`, {completed:true}))
			

		},

	}
})


export default MarkAllButton