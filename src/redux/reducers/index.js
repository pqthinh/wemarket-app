import { combineReducers } from 'redux'
import UserReducers from './UserReducers'
import { listTopViewProduct, listProduct } from './HomeReducers'
import { listProductMapFilter } from './MapReducers'

const appReducer = combineReducers({
  userState: UserReducers,
  listTopViewProduct,
  listProduct,
  listProductMapFilter
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
