import React from 'react'
import PropTypes from 'prop-types'

/*

      <li className="editing">
          <input className="edit" autoFocus defaultValue={text}   />
      </li>

*/
const onEnter = (e) => {

      console.log("hey");
  if(e.keyCode === 13){
      console.log("ho");
  }
}

class Todo extends React.Component {

   constructor(props) {
      super(props);
      this.state = {value:''}

      this.handleChange = this.handleChange.bind(this);
      this.keyPress = this.keyPress.bind(this);
      this.onBlur = this.onBlur.bind(this);
   } 

   handleChange(e) {
      this.setState({ value: e.target.value });
   }

  
   keyPress(e){
      if(e.keyCode == 13){
        if(e.target.value.trim() !== ""){
          this.props.onEdit(this.props.id, e.target.value.trim());
        } else {
          this.props.onEdit(this.props.id, this.props.text);
        }
      }
   }

   onFocus(e){
      var store = e.target.value
      e.target.value = ""
      e.target.value = store
   }
   onBlur(e){
      if(e.target.value.trim() !== ""){
        this.props.onEdit(this.props.id, e.target.value.trim());
      } else {
        this.props.onEdit(this.props.id, this.props.text);
      }
   }

   render(){
    if(this.props.edit === true){
      return (
        <li className="editing">
            <input type="text" id={"edit"+this.props.id} className="edit" autoFocus="autofocus" onFocus={this.onFocus}onBlur={this.onBlur} defaultValue={this.props.text} onKeyDown={this.keyPress}/>
        </li>
        )
    } else if(this.props.completed === true){
      return (
      <li className='completed' >
        <div className="view">
          <input className="toggle" type="checkbox" defaultChecked onChange={this.props.onChange}/>
          <label onDoubleClick={() => this.props.onEdit(this.props.id, this.props.text)}>{this.props.text}</label>
          <button className="destroy" onClick={this.props.onDelete}></button>
        </div>
      </li>
      )
    } else {
      return (
      <li>
        <div className="view">
          <input className="toggle" id={"checkbox" + this.props.id} type="checkbox" onChange={this.props.onChange}/>
          <label onDoubleClick={() => this.props.onEdit(this.props.id, this.props.text)}>{this.props.text}</label>
          <button className="destroy" onClick={this.props.onDelete}></button>
        </div>
      </li>
     )
    }
   }
} () => {
  
}

Todo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default Todo