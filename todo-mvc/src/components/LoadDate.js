
import {component, element, decodeValue} from 'vdux'
import fire from 'vdux-fire'
import TimeSlot from './TimeSlot'

const TOTAL_APPOINTMENT_SLOTS = 48;		//the 1 is the -1 in the 0 index 
const MAX_PATIENTS_PER_SLOT = 6


const LoadDate = fire((props) => ({
  foundDate:`/Dates/${props.date}`,
}))	(component({
  initialState: {
    month: "",
    day: "",
    year: "",
    dateString: "",
    kid: "",
    appointments: null,
    appointmentsArr: [],
    totalPatients: 0,
   },
	render({props, state, actions}) {
		var loadedDate = <p>nothing</p>;
		var totalPatientsJSX = <span/>;
		if(state.dateString == "")
			loadedDate = <span/>
		else if(state.appointments == null){
			loadedDate = <p>No appointments on {state.dateString}</p>
		} else {
			loadedDate = <ul>{state.appointments}</ul>
		}
		if(state.totalPatients > 0)
			totalPatientsJSX = <div>Total Patients: {state.totalPatients}</div>
		return(
			<div>
				<button class="load-date-button" onClick={actions.submitCheck} label="Load Date" type="checkbox">Load Date</button>
				<p>:</p>
		        <form
		        >

		          <input size="2" value={state.month} onKeyUp={decodeValue(actions.updateMonth)} placeholder="MM" autoFocus/>
		          <span>-</span>
		          <input size="2" value={state.day} onKeyUp={decodeValue(actions.updateDay)} placeholder="DD" autoFocus/>
		          <span>-</span>
		          <input size="4" value={state.year} onKeyUp={decodeValue(actions.updateYear)} placeholder="YYYY" autoFocus/>
		          <span>  </span>
		          <input size="10" value={state.kid} onKeyUp={decodeValue(actions.updateKid)} placeholder="Kaiser ID" autoFocus/>
		        </form>
		        <p id="load-date-error-message"></p>
		        <div>{totalPatientsJSX}{loadedDate}</div>
		        
			</div>
			)
	},

	controller: {
		* submitCheck({state, props, actions, context}, onlyOneRecursion = 0){
			var result = yield actions.submit()
			var tempArr = [];
			tempArr.length = 48;
			tempArr.fill([-1]);
			tempArr[22] = []
			if(result != ""){
				let snapshot = yield context.firebaseOnce(`Dates/${result}`)
				if(snapshot.val()){
					var foundDate = snapshot.val()
					var appointments = []
					for(var i=0; i < TOTAL_APPOINTMENT_SLOTS; i++){
						var slotPatients = foundDate.appointments[i] ? foundDate.appointments[i] : []
						appointments.push(<TimeSlot index={i} patients={slotPatients} addPatientAtIndex={actions.addPatientAtIndex} kid={state.kid}/>)
					}
					yield actions.updateAppointments(appointments)
					yield actions.updateAppointmentsArr(foundDate.appointments)
					yield actions.updateTotalPatients(foundDate.totalPatients)
				} else {
					yield context.firebaseSet(`Dates/${result}`,{totalPatients:0,appointments:tempArr})
					if(!onlyOneRecursion)
						yield actions.submitCheck(1)
				}
			}
	        yield props.setDate(result)
		},
		* addPatientAtIndex({state, props, actions, context}, index){
			console.log(index)
			var {kid, appointmentsArr, totalPatients,dateString} = state
			if(kid.length == 10 && !isNaN(kid)){
				if(appointmentsArr[index]){
					if(appointmentsArr[index].length == MAX_PATIENTS_PER_SLOT + 1){		//+1 for dummy patient in each slot to keep it from deleting
						document.getElementById("load-date-error-message").innerHTML = "ERROR: MAX PATIENTS PER SLOT IS " + MAX_PATIENTS_PER_SLOT
						return false
					} else {
						appointmentsArr[index].push(parseInt(kid))
					}
				} else {
					appointmentsArr[index] = [-1, parseInt(kid)]
				}
			} else {
				document.getElementById("load-date-error-message").innerHTML = "BAD KID FORMAT: KID MUST BE 10 DIGITS"
      			return false

			}
			yield actions.updateTotalPatients(state.totalPatients + 1)
			yield actions.updateAppointmentsArr(appointmentsArr)
			yield context.firebaseUpdate(`Dates/${dateString}`,{appointments:appointmentsArr,totalPatients:totalPatients})
			yield actions.submitCheck()
			return true
		},
	    * submit ({state, props, actions,context}) {
	    	var {month, day, year} = state
	        if (month.length != 2){
	        	console.log(month)
				document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: MONTH MUST BE 2 DIGITS"
      				return ""
	        } 
	        if(day.length != 2){
	        	console.log(day)
				document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: DAY MUST BE 2 DIGITS"
      				return ""
	        }
	        if(year.length != 4){
	        	console.log(year)
				document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: YEAR MUST BE 4 DIGITS"
      				return ""
	        }


	        var monthNum
        	if(isNaN(month)){
      			document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: MONTH NOT A NUMBER"
      				return ""
          	} else {
          		monthNum = parseInt(month)
          		if(monthNum < 1 || monthNum > 12){
      				document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: MONTH MUST BE BETWEEN 1 AND 12"
      				return ""
          		}
          	}
          	var dayNum
          	if(isNaN(day)){
          		document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: DAY NOT A NUMBER"
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
      				document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: DAY MUST BE BETWEEN 1 AND " + limit
      				return ""
          		}
          	}


	    	var {year} = state
          	var yearNum      
          	if(isNaN(year)){
          		document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: YEAR NOT A NUMBER"
      				return ""
	        } else {
	        	yearNum = parseInt(year)
          		if(yearNum < 1776 || yearNum > 9999){
      				document.getElementById("load-date-error-message").innerHTML = "BAD DATE FORMAT: DAY MUST BE BETWEEN 1776 AND 9999"
      				return ""
          		}
	        }
	        var finalString = month + "-" + day + "-" + year
	        var temp = new Date(yearNum, monthNum-1, dayNum);
	        yield actions.updateDateString(temp.toDateString())
	        return temp.toDateString()
	    }

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
	    updateDateString: (state, dateString) => ({
	      dateString
	    }),
	    updateKid: (state, kid) => ({
	      kid
	    }),
	    updateTotalPatients: (state, totalPatients) => ({
	      totalPatients
	    }),
	    updateAppointments: (state, appointments) => ({
	      appointments
	    }),
	    updateAppointmentsArr: (state, appointmentsArr) => ({
	      appointmentsArr
	    }),
	},
}))


export default LoadDate