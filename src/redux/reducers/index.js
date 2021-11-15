import { combineReducers } from 'redux'
import UserReducers from './UserReducers'
import { listTopViewProduct, listProduct } from './HomeReducers'

const appReducer = combineReducers({
  userState: UserReducers,
  listTopViewProduct,
  listProduct
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
