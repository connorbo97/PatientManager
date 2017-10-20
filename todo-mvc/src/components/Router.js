import 'regenerator-runtime/runtime'
import vdux from 'vdux/dom'
import {component, element} from 'vdux'
import Home from './Home'
import LoginPage from './LoginPage'
import enroute from 'enroute'

const router = enroute({
  '/': (params, props) => (<Home {...props} />),
  '/signin': (params, props) => (<LoginPage {...props}/>)
})


const Router = component({
	
	render ({props, context}) {
		const route = router(context.url, props)
		return route
	},
})

export default Router