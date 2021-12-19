import { combineReducers } from 'redux'
import { userState, settingState } from './UserReducers'
import { listTopViewProduct, listProduct } from './HomeReducers'
import { listProductMapFilter } from './MapReducers'
import { manageChat } from './ChatReducers'
import { getProductDetails } from './ProductReducers'
import { manageProfile } from './ProfileReducers'

const appReducer = combineReducers({
  userState,
  listTopViewProduct,
  listProduct,
  listProductMapFilter,
  manageChat,
  getProductDetails,
  manageProfile,
  settingState
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
