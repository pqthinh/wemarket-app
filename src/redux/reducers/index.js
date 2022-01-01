import { combineReducers } from 'redux'
import { userState, settingState, history } from './UserReducers'
import { listTopViewProduct, listProduct, listNewProduct } from './HomeReducers'
import { listProductMapFilter } from './MapReducers'
import { manageChat } from './ChatReducers'
import {
  productDetail,
  createProduct,
  listBookmark,
  resSearchProduct
} from './ProductReducers'
import { manageProfile } from './ProfileReducers'
import { manageNotifies } from './NotifyReducers'
import { manageBookmarks } from './BookmarkReducers'
import { listProductSeenRecent } from './SeenRecentReducers'
import { manageOrder } from './OrderReducers'
import { fetchSameProduct } from './SameProductReducers'

const appReducer = combineReducers({
  userState,
  listNewProduct,
  listTopViewProduct,
  listProduct,
  listProductMapFilter,
  manageChat,
  productDetail,
  createProduct,
  manageProfile,
  settingState,
  manageNotifies,
  manageBookmarks,
  listProductSeenRecent,
  listBookmark,
  history,
  resSearchProduct,
  manageOrder,
  fetchSameProduct
})

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer
