import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import LoadDate from './LoadDate'
import AddDate from './AddDate'
import fire from 'vdux-fire'

/*
	<MarkAllCompletedButton/>
	<VisibleTodoList/>
*/
const AddResult = component({
	initialState:{
		timeString:""
	},
	render ({props, state, actions}) {
		var {index, patients, addPatientAtIndex} = props
		var timeString = convertIndexToTimeSlot(index + 1)
		if(patients.length > 1){
			for(var i = 1; i < patients.length; i++){
				if(patients[i]){
					if(i == patients.length -1)
						timeString += patients[i]
					else
						timeString = timeString + patients[i] + ", "
				}
			}
		} else {
			timeString += "None"
		}
	    return (
	    	<li ><span>{timeString}</span><button class="add-patient-button" onClick={actions.onClick(timeString)}>Add Patient</button></li>
		  )
	},
	controller:{
		* onClick ({props, actions,state}, timeString) {
			var {index, kid} = props
	    	var result = yield props.addPatientAtIndex(index)
	    	if(result)
	    		yield actions.updateTimeString(timeString + ", " + kid)
	    },
	},

	reducer:{
	    updateTimeString: (state, timeString) => ({
	      timeString
	    }),
	}

})


const convertIndexToTimeSlot = (index) => {
	switch(index){
		case 1: return "00:00 - 0:30: "
		case 2: return "00:30 - 1:00: "
		case 3: return "01:00 - 1:30: "
		case 4: return "01:30 - 2:00: "
		case 5: return "02:00 - 2:30: "
		case 6: return "02:30 - 3:00: "
		case 7: return "03:00 - 3:30: "
		case 8: return "03:30 - 4:00: "
		case 9: return "04:00 - 4:30: "
		case 10: return "04:30 - 5:00: "
		case 11: return "05:00 - 5:30: "
		case 12: return "05:30 - 6:00: "
		case 13: return "06:00 - 6:30: "
		case 14: return "06:30 - 7:00: "
		case 15: return "07:00 - 7:30: "
		case 16: return "07:30 - 8:00: "
		case 17: return "08:00 - 8:30: "
		case 18: return "08:30 - 9:00: "
		case 19: return "09:00 - 9:30: "
		case 20: return "09:30 - 10:00: "
		case 21: return "10:00 - 10:30: "
		case 22: return "10:30 - 11:00: "
		case 23: return "11:00 - 11:30: "
		case 24: return "11:30 - 12:00: "
		case 25: return "12:00 - 12:30: "
		case 26: return "12:30 - 13:00: "
		case 27: return "13:00 - 13:30: "
		case 28: return "13:30 - 14:00: "
		case 29: return "14:00 - 14:30: "
		case 30: return "14:30 - 15:00: "
		case 31: return "15:00 - 15:30: "
		case 32: return "15:30 - 16:00: "
		case 33: return "16:00 - 16:30: "
		case 34: return "16:30 - 17:00: "
		case 35: return "17:00 - 17:30: "
		case 36: return "17:30 - 18:00: "
		case 37: return "18:00 - 18:30: "
		case 38: return "18:30 - 19:00: "
		case 39: return "19:00 - 19:30: "
		case 40: return "19:30 - 20:00: "
		case 41: return "20:00 - 20:30: "  
		case 42: return "20:30 - 21:00: "
		case 43: return "21:00 - 21:30: "
		case 44: return "21:30 - 22:00: "
		case 45: return "22:00 - 22:30: "
		case 46: return "22:30 - 23:00: "
		case 47: return "23:00 - 23:30: "
		case 48: return "23:30 - 0:00: "
		default: return "failed index " + index
	}
}

export default 	AddResult