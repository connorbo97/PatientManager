import vdux from 'vdux/dom'
import {component, element, decodeValue} from 'vdux'



const AddToDo = component({

  initialState: {
    value: ''
  },

  render({props, state, actions}) {
    return (
     <div>
        <form
          onSubmit={actions.submit}
        >

          <input id="add-to-do-input"value={state.value} onKeyUp={decodeValue(actions.update)} class="new-todo" placeholder="What needs to be done?" autoFocus/>
        </form>
      </div>
    )
  },

  controller: {
    * submit ({state, props, actions,context}) {
        if (!state.value.trim()) {
          return
        }
        var newToDo = {
          text:state.value,
          completed:false,
          edit:false
        }
        yield context.firebasePush(`/todos/${context.uid}/todos`, newToDo)
        // yield context.firebaseUpdate('/todos', {
        //   value: newValue
        // })
        yield actions.submitTextValue('')
    }
  },

  reducer: {
    submitTextValue: (state, value) => {
      document.getElementById("add-to-do-input").value = ""       //Shouldn't have to do this, not sure why
      return {value}
    },
    update: (state, value) => ({
      value
    })
  }
})


export default AddToDo