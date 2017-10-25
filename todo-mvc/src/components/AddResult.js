import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import LoadDate from './LoadDate'
import AddDate from './AddDate'
import fire from 'vdux-fire'

/*
	<MarkAllCompletedButton/>
	<VisibleTodoList/>
*/
const AddResult = fire((props) => ({
  dateResult:`/Dates/${props.dateString}/Slots`,
})) (component({
	* onCreate({actions,props}){
	},
	render ({props, state, actions}) {
		if(props.dateResult.loading)
			return (<span></span>)
		var temp = "tada"
		if(props.dateResult.value){
			temp = "tada 1"
		}
		else{
			actions.test()
		}
	    return (
	    	<div onload={actions.test(props.dateResult)}>
	    	{temp}
			</div>
		  )
	},

	reducer:{
	    test: (state, dateResult) => {
	    	console.log(dateResult)
	    	return {time:1}
	    },
	}

}))

export default 	AddResult