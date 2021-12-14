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
