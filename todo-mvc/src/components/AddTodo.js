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

          <input onKeyUp={decodeValue(actions.update)} value={state.value}
            className="new-todo" placeholder="What needs to be done?" autoFocus
          
          />
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
        yield context.firebasePush(`/todos/${props.user}/`, newToDo)
        // yield context.firebaseUpdate('/todos', {
        //   value: newValue
        // })
        yield actions.submitTextValue('')
    }
  },

  reducer: {
    submitTextValue: (state, value) => ({
      value
    }),
    update: (state, value) => ({
      value
    })
  }
})


export default AddToDo