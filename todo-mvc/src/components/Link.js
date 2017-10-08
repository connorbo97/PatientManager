import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import fire from 'vdux-fire'

const Link = component({
  render({props, actions}){
    var {filter, content} = props
    var active = (filter === props.visibilityFilter)
    if (active) {
        return (<span>
          <a className="selected" href= {"#/" + content} onClick={props.setFilter(filter)}>
            {content}
          </a>
        </span>
        )
      }
      return (
        <span>
          <a href= {"#/" + content} onClick={props.setFilter(filter)}>
          {content}
        </a>
      </span>

      )
  },
  
})


export default Link