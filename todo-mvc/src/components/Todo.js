import {component, element, decodeRaw} from 'vdux'

/*

      <li className="editing">
          <input className="edit" autoFocus defaultValue={text}   />
      </li>

*/

const Todo = component({
  initialState:{
    text:''
  },

  render({props, state, actions}) {
    if(props.edit === true){
      return (
        <li className="editing">
          <input type="text" id={"edit"+ props.keyID} className="edit" autoFocus="autofocus" onFocus={decodeRaw(actions.focus)} defaultValue={props.text} onKeyUp={decodeRaw(actions.update)}/>
        </li>
        )
    } else{
        return (
          <li className='completed' >
            <div className="view">
              <input className="toggle" id={"checkbox" + props.keyID} checked={props.completed} type="checkbox" defaultChecked onChange={actions.change}/>
              <label onDblClick={actions.startEdit}>{props.text}</label>
              <button className="destroy" onClick={actions.delete}></button>
            </div>
          </li>
          )
      }
    },


  controller: {
    * change ({state, props, actions, context}) {
        yield context.firebaseUpdate(`/todos/${props.user}/${props.keyID}/`, {completed:!props.completed})
    },

    * delete ({state, props, actions, context}) {
      yield context.firebaseSet(`/todos/${props.user}/${props.keyID}/`, null)
    },


    * endEdit ({state, props, actions, context}) {
      yield context.firebaseUpdate(`/todos/${props.user}/${props.keyID}/`, {edit:false, text:state.text})
    },

    * startEdit ({state, props, actions, context}) {
      yield context.firebaseUpdate(`/todos/${props.user}/${props.keyID}/`, {edit:true})
    },




    * update ({state, props, actions}, event) {
        if(event.keyCode === 13){
          yield actions.endEdit(props.id, event.target.value.trim())
        }
        yield actions.updateText(event.target.value)
    }


  },

  reducer: {
    updateText: (state,text) => {
      return {
        text
      }
    },

    focus: (state, event) => {
      var store = event.target.value
      event.target.value = ""
      event.target.value = store
    },

    editText: (state, text) => {
      return {
        text
      }
    }
  }
})

export default Todo