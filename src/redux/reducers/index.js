import { combineReducers } from 'redux'
import UserReducers from './UserReducers'
import { listTopViewProduct, listProduct } from './HomeReducers'
import { listProductMapFilter } from './MapReducers'
import { manageChat } from './ChatReducers'
import { getProductDetails } from './ProductReducers'

import { manageProfile } from './ProfileReducers'
const appReducer = combineReducers({
  userState: UserReducers,
  listTopViewProduct,
  listProduct,
  listProductMapFilter,
  manageChat,
  getProductDetails,
  manageProfile
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
