
import {component, element, decodeValue} from 'vdux'
import fire from 'vdux-fire'



const LoadDate = fire((props) => ({
  foundDate:`/Dates/${props.date}`,
}))	(component({
  initialState: {
    month: "",
    day: "",
    year: "",
   },
	render({props, state, actions}) {
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
		        </form>
		        <p id="load-date-error-message"></p>
		        
			</div>
			)
	},

	controller: {
		* submitCheck({state, props, actions, context}){
			var result = yield actions.submit()
			var tempArr = [];
			tempArr.length = 48;
			tempArr.fill([-1]);
			tempArr[22] = []
			if(result != ""){
				yield context.firebaseSet(`Dates/${result}`,{totalPatients:0,appointments:tempArr})
	        	yield props.setDate(result)
			}
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
	},
}))


export default LoadDate