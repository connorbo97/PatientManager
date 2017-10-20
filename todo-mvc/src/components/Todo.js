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
        <li class="editing">
          <input type="text" id={"edit"+ props.keyID} class="edit" autoFocus="autofocus" onFocus={decodeRaw(actions.focus)} defaultValue={props.text} onKeyUp={decodeRaw(actions.update)}/>
        </li>
        )
    } else{
        if(props.completed === true){
          
          return (
            <li class='completed' >
              <div class="view">
                <input class="toggle" id={"checkbox" + props.keyID} checked={props.completed} type="checkbox" defaultChecked onChange={actions.change}/>
                <label onDblClick={actions.startEdit}>{props.text}</label>
                <button class="destroy" onClick={actions.delete}></button>
              </div>
            </li>
          )
        }
        else {
          return (
            <li>
              <div className="view">
                <input class="toggle" id={"checkbox" + props.keyID} checked={props.completed} type="checkbox" defaultChecked onChange={actions.change}/>
                <label onDblClick={actions.startEdit}>{props.text}</label>
                <button class="destroy" onClick={actions.delete}></button>
              </div>
            </li>
          )
        }
      }
    },


  controller: {
    * change ({state, props, actions, context}) {
        yield context.firebaseUpdate(`/todos/${context.uid}/todos/${props.keyID}/`, {completed:!props.completed})
    },

    * delete ({state, props, actions, context}) {
      yield context.firebaseSet(`/todos/${context.uid}/todos/${props.keyID}/`, null)
    },


    * endEdit ({state, props, actions, context}) {
      yield context.firebaseUpdate(`/todos/${context.uid}/todos/${props.keyID}/`, {edit:false, text:state.text})
    },

    * startEdit ({state, props, actions, context}) {
      yield context.firebaseUpdate(`/todos/${context.uid}/todos/${props.keyID}/`, {edit:true})
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