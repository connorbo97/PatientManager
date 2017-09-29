import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import FooterContainer from '../containers/FooterContainer'
import Main from './Main'
import PropTypes from 'prop-types'
import BottomText from './BottomText'

const App = ({todos}) => {

	return ( 
	  <div>
	    <section className="todoapp">
	   		<Header />
	   		<Main length={todos.length}/>
	  		<FooterContainer/>
	   	</section>
	   	<BottomText />
	  </div>
	)
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
}

export default connect(
	({todos}) => ({todos})
)(App)