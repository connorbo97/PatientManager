import 'regenerator-runtime/runtime'
import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Main from './Main'
import BottomText from './BottomText'
import LogoutButton from './LogoutButton'


const Home = component({
  initialState: {
    date: "",
    patient: "",
    visibilityFilter: 'SHOW_ALL',
   },

   * onCreate({props}){

   },
	render({props,state,actions, context}){
		return (
			<div>
				<LogoutButton {...props} {...actions} {...state}/>
        <Main {...props} {...actions} {...state}/>
			</div>
		)
	},


  reducer: {
    setDate: (state, date) => ({
      date
    }),
    
  }
	  

})

export default Home