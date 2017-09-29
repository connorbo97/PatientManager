import React from 'react'
import VisibleTodoList from '../containers/VisibleTodoList'
import PropTypes from 'prop-types'
import MarkAllCompletedButton from '../containers/MarkAllCompletedButton'

const Main = ({length}) => {
	if(length !== 0){
		return (
			<section className="main">
				<MarkAllCompletedButton/>
				<VisibleTodoList/>
			</section>
		)

	} else {
		return (<span/>)
	}

}


Main.propTypes = {
  length: PropTypes.number.isRequired,
}

export default 	Main