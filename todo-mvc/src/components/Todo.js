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
            <input type="text" id={"edit"+ props.id} className="edit" autoFocus="autofocus" onFocus={decodeRaw(actions.focus)} defaultValue={state.text} onKeyUp={decodeRaw(actions.update)}/>
        </li>
        )
    } else if(props.completed === true){
        return (
          <li className='completed' >
            <div className="view">
              <input className="toggle" id={"checkbox" + props.id} type="checkbox" defaultChecked onChange={actions.change}/>
              <label onDblClick={actions.edit(props.text)}>{props.text}</label>
              <button className="destroy" onClick={actions.delete}></button>
            </div>
          </li>
        )
      } else {
        return (
        <li>
          <div className="view">
            <input className="toggle" id={"checkbox" + props.id} unchecked type="checkbox" onChange={actions.change}/>
            <label onDblClick={actions.edit}>{props.text}</label>
            <button className="destroy" onClick={actions.delete}></button>
          </div>
        </li>
       )
      }
    },


  controller: {
    * change ({state, props, actions}) {
        yield props.onChange()
    },

    * delete ({state, props, actions}) {
        yield props.onDelete()
    },


    * edit ({state, props, actions}) {
        yield props.onEdit(props.id, props.text)
        yield actions.editText(props.text)
    },




    * update ({state, props, actions}, event) {
        if(event.keyCode === 13){
          yield props.onEdit(props.id, event.target.value.trim())
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