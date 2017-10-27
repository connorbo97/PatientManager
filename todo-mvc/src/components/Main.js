import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import LoadDate from './LoadDate'
import AddDate from './AddDate'
import fire from 'vdux-fire'

/*
	<MarkAllCompletedButton/>
	<VisibleTodoList/>
*/
const Main = fire((props) => ({
  appointmentsOnDate:`/Dates/${props.date}`,
  appointmentsForPatient:`/KaiserNumbers/${props.patient}`
})) (component({
	render ({props, state, actions}) {
		console.log(props.appointmentsOnDate)
		var result = "No Date Loaded"
		var timeSlots = []
		if(props.date != ""){
			result += " Date:" + props.date 
			if(!props.appointmentsOnDate.loading){
				var appointments
			}
		}

	    return (
	    	<div>
	    		<LoadDate {...props} {...state} {...actions}/>
	    		<AddDate {...props} {...state} {...actions}/>
			</div>
		  )
	}

}))

export default 	Main