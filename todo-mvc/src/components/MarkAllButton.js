import {component, element} from 'vdux'



const MarkAllButton = component({
	render({props, state, actions}) {
		if(props.todos.value == null){return <span/>}
		if(props.todos.loading){
			return <span></span>
		} else {
			if(props.todos.value.length == 0){return <span/>}
			return(
				<div onClick={actions.markAll}>
					<input id="toggle-all" class="toggle-all" type="checkbox" />
					<label htmlFor="toggle-all">Mark all as complete</label>
				</div>
			)
		}
	},

	controller: {
		* markAll ({props, state,actions,context}) {
			var todos = props.todos.value
			var markCompleted = false
			todos.map(todo => {
				if(!(todo.completed))
					markCompleted=true
				return todo
			})
			if(markCompleted){
				yield todos.map(todo => context.firebaseUpdate(`/todos/${context.uid}/todos/${todo.key}/`, {completed:true}))

			} else {
				yield todos.map(todo => context.firebaseUpdate(`/todos/${context.uid}/todos/${todo.key}/`, {completed:false}))
			}
			

		},

	},

	reducer: {

	    testChange: (state) => {
	    	console.log("boi")
	      return {}
	    },
	},
})


export default MarkAllButton