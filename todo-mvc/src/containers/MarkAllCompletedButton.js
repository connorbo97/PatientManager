import { connect } from 'react-redux'
import { markAllCompleted } from '../actions'
import MarkAllButton from '../components/MarkAllButton'


const mapStateToProps = state => ({})


const mapDispatchToProps = dispatch => {
  return {
    onMarkAll: () => {
    	console.log("hey");
      dispatch(markAllCompleted())
    }
  }
}

const MarkAllCompletedButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(MarkAllButton)

export default MarkAllCompletedButton