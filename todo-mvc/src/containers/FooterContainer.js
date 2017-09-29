import { connect } from 'react-redux'
import { deleteCompleted } from '../actions'
import Footer from '../components/Footer'


const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClearCompleted: () => {
      dispatch(deleteCompleted())
    }
  }
}

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)

export default FooterContainer