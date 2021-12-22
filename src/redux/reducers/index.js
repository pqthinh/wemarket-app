import { combineReducers } from 'redux'
import UserReducers from './UserReducers'
import { listTopViewProduct, listProduct } from './HomeReducers'
import { listProductMapFilter } from './MapReducers'
import { manageChat } from './ChatReducers'
import { getProductDetails } from './ProductReducers'
import { manageProfile } from './ProfileReducers'
import { manageNotifies } from './NotifyReducers'
import { manageBookmarks } from './BookmarkReducers'
import { listProductSeenRecent } from './SeenRecentReducers'
const appReducer = combineReducers({
  userState: UserReducers,
  listTopViewProduct,
  listProduct,
  listProductMapFilter,
  manageChat,
  getProductDetails,
  manageProfile,
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
