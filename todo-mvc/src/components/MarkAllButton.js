import React from 'react'
import PropTypes from 'prop-types'


const MarkAllButton = ({ onMarkAll}) => {
	return(
			<div  onClick={onMarkAll}>
				<input id="toggle-all" className="toggle-all" type="checkbox"/>
				<label htmlFor="toggle-all">Mark all as complete</label>
			</div>
	)
}


MarkAllButton.propTypes = {
  onMarkAll: PropTypes.func.isRequired
}


export default MarkAllButton