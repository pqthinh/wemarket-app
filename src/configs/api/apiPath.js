// user detail
export const API_GET_USER_DETAIL = uid => `/user/info/${uid}`
export const REGISTER_USER = `/user/create`
// get product
export const GET_LIST_PRODUCT = '/common/product'
// filter product in map
export const FILTER_LIST_PRODUCT = '/common/product/filter'
// get product detail
export const GET_PRODUCT_DETAIL = '/common/product'
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
// get image map via lat lng radius
export const getImageMap = (
  lat = 21.0378383,
  lng = 105.7833717,
  radius = 1
) => {
  let zoom = 12
  if (radius <= 20) zoom = 11
  if (radius > 20 && radius < 50) zoom = 10
  if (radius > 50) zoom = 9
  if (radius > 100) zoom = 8
  return `https://external.fhan4-3.fna.fbcdn.net/static_map.php?v=2022&theme=default&ccb=4-4&size=516x516&language=en_US&scale=1&zoom=${zoom}&center=${lat},${lng}&marker_list[0]=${lat},${lng}&circle=weight:2|color:0x4D6AA47f|fillcolor:0x4D6AA41c|${lat},${lng}|${radius}k`
}
// get top product in home page
export const GET_LIST_SEARCH_PRODUCT = ''
export const GET_LIST_NEW_PRODUCT = '/product/new-post'
export const GET_LIST_FAV_PRODUCT = '/product/top-view'
export const CREATE_PRODUCT = '/product/create'
export const GET_COMMENT = '/product/comment'
