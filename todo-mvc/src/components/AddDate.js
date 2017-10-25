
import {component, element, decodeValue} from 'vdux'
import fire from 'vdux-fire'
import AddResult from './AddResult'

const SLOT_LIMIT = 18


const AddDate = fire((props) => ({
  foundDate:`/Dates/${props.date}`,
}))	(component({
  initialState: {
    month: "09",
    day: "27",
    year: "1997",
    patient: "1234567890",
    patientConfirm: "1234567890",
    slot: "1",
    "submitted":false,
   },
	render({props, state, actions}) {
		return(
			<div>
				<button class="load-date-button" onClick={actions.submitCheck} label="Add Date" type="checkbox">Add Patient to Date and Slot</button>
				<p>:</p>
		        <form
		        >
		          <input size="2" value={state.month} onKeyUp={decodeValue(actions.updateMonth)} placeholder="MM" autoFocus/>
		          <span>-</span>
		          <input size="2" value={state.day} onKeyUp={decodeValue(actions.updateDay)} placeholder="DD" autoFocus/>
		          <span>-</span>
		          <input size="4" value={state.year} onKeyUp={decodeValue(actions.updateYear)} placeholder="YYYY" autoFocus/>
		        </form>
		        <form>  
		          <span> KID:</span>
		          <input size="10" value={state.patient} onKeyUp={decodeValue(actions.updatePatient)}  autoFocus/>
		          <span> Confirm KID:</span>
		          <input size="10" value={state.patientConfirm} onKeyUp={decodeValue(actions.updatePatientConfirm)}  autoFocus/>
		        </form>
		        <form>  
		          <span> Slot:</span>
		          <input size="10" value={state.slot} onKeyUp={decodeValue(actions.updateSlot)}  autoFocus/>
		        </form>
		        <p id="add-date-error-message"></p>
			</div>
			)
	},

	controller: {
		* submitCheck({state, props, actions, context}){
			var {KID, slot} = state
			var result = yield actions.submit()
			if(result != ""){
			}
		},
	    * submit ({state, props, actions,context}) {
	    	var {month, day, year, patient, patientConfirm, slot} = state
	        if (month.length != 2){
	        	console.log(month)
				document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: MONTH MUST BE 2 DIGITS"
      				return ""
	        } 
	        if(day.length != 2){
	        	console.log(day)
				document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: DAY MUST BE 2 DIGITS"
      				return ""
	        }
	        if(year.length != 4){
	        	console.log(year)
				document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: YEAR MUST BE 4 DIGITS"
      				return ""
	        }


	        var monthNum
        	if(isNaN(month)){
      			document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: MONTH NOT A NUMBER"
      				return ""
          	} else {
          		monthNum = parseInt(month)
          		if(monthNum < 1 || monthNum > 12){
      				document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: MONTH MUST BE BETWEEN 1 AND 12"
      				return ""
          		}
          	}
          	var dayNum
          	if(isNaN(day)){
          		document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: DAY NOT A NUMBER"
      				return ""
          	} else {
          		dayNum = parseInt(day)
          		var limit = 31
          		switch(monthNum){
          			case 9:
          			case 4:
          			case 6:
          			case 11:
          				limit = 30
          				break
          			case 2:
          				limit = 29
          				break
          			default:
          				limit = 31

          		}
          		if(dayNum < 1 || dayNum > limit){
      				document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: DAY MUST BE BETWEEN 1 AND " + limit
      				return ""
          		}
          	}


	    	var {year} = state
          	var yearNum      
          	if(isNaN(year)){
          		document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: YEAR NOT A NUMBER"
      				return ""
	        } else {
	        	yearNum = parseInt(year)
          		if(yearNum < 1776 || yearNum > 9999){
      				document.getElementById("add-date-error-message").innerHTML = "BAD DATE FORMAT: DAY MUST BE BETWEEN 1776 AND 9999"
      				return ""
          		}
	        }

	        if(patient.length != 10){
  				document.getElementById("add-date-error-message").innerHTML = "BAD KID: MUST BE 10 CHARACTERS"
  				return ""
	        }
	        if(patient != patientConfirm){
  				document.getElementById("add-date-error-message").innerHTML = "BAD KID CONFIRM: KID AND KID CONFIRM MUST MATCH"
  				return ""
	        }
	        if(isNaN(slot) || parseInt(slot) > SLOT_LIMIT){
  				document.getElementById("add-date-error-message").innerHTML = "BAD SLOT: MUST BE A NUMBER LESS THAN OR EQUAL TO "  + SLOT_LIMIT
  				return ""
	        }
	        var finalString = month + "-" + day + "-" + year
	        return finalString
	    },


	},

	reducer: {

	    updateMonth: (state, month) => ({
	      month
	    }),
	    updateDay: (state, day) => ({
	      day
	    }),
	    updateYear: (state, year) => ({
	      year
	    }),
	    updatePatient: (state, patient) => ({
	      patient
	    }),
	    updatePatientConfirm: (state, patientConfirm) => ({
	      patientConfirm
	    }),
	    updateSlot: (state, slot) => ({
	      slot
	    }),
	    flipSubmitted: (state, submitted) => ({
	      submitted
	    }),
	},
}))


export default AddDate