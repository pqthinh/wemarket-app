import { combineReducers } from 'redux'
import UserReducers from './UserReducers'
import { listTopViewProduct, listProduct } from './HomeReducers'
import { listProductMapFilter } from './MapReducers'
import { manageChat } from './ChatReducers'
import { manageProfile } from './ProfileReducers'
const appReducer = combineReducers({
  userState: UserReducers,
  listTopViewProduct,
  listProduct,
  listProductMapFilter,
  manageChat,
  manageProfile
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
