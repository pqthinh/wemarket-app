import { combineReducers } from 'redux'
import { userState, settingState } from './UserReducers'
import { listTopViewProduct, listProduct, listNewProduct } from './HomeReducers'
import { listProductMapFilter } from './MapReducers'
import { manageChat } from './ChatReducers'
import { getProductDetails } from './ProductReducers'
import { manageProfile } from './ProfileReducers'
import { manageNotifies } from './NotifyReducers'
import { manageBookmarks } from './BookmarkReducers'
import { listProductSeenRecent } from './SeenRecentReducers'
const appReducer = combineReducers({
  userState,
  listNewProduct,
  listTopViewProduct,
  listProduct,
  listProductMapFilter,
  manageChat,
  getProductDetails,
  manageProfile,
  settingState,
  manageNotifies,
  manageBookmarks,
  listProductSeenRecent
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
