import { combineReducers } from 'redux'
import UserReducers from './UserReducers'

const appReducer = combineReducers({
  userState: UserReducers
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
