// user detail
export const API_GET_USER_DETAIL = uid => `/user/info/${uid}`
export const REGISTER_USER = `/user/create`

// get product
export const GET_LIST_PRODUCT = '/common/product'

// filter product in map
export const FILTER_LIST_PRODUCT = '/common/product/filter'

// get product detail
export const GET_PRODUCT_DETAIL = (idProduct, lat, lng) =>
  `/common/product/${idProduct + lat && lng ? `?lat=${lat}&lng=${lng}` : ''}`

// get post user
export const GET_POST_USER = '/user/product'

// get notifies user
export const GET_LIST_NOTIFY = uid => `/common/notify/${uid}`

// update notifies user
export const UPDATE_LIST_NOTIFY = '/user/read-notify'

// delete notifies user
export const DELETE_NOTIFY_USER = '/user/delete-notify'

// get bookmarks
export const GET_LIST_BOOKMARK = uid => `/bookmark/${uid}`

// create bookmark

export const CREATE_BOOKMARK = '/bookmark/create'

// delete bookmark
export const DELETE_BOOKMARK = '/bookmark/delete'

//get list seen_recent
export const GET_LIST_SEEN_RECENT = uid => `/product/seen_recent/${uid}`
