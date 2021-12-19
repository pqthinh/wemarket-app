import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  LOCATION_REQUEST,
  LOCATION_SUCCESS,
  LOCATION_FAILED,
  SET_RADIUS,
  SET_CATEGORY
} from '../actionTypes/userActionTypes'

const userState = (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        userInfo: null,
        message: ''
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        message: ''
      }
    case SIGNUP_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        message: ''
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        message: ''
      }
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case LOGOUT:
      return {
        ...state,
        userInfo: null,
        loading: false,
        type: action.type,
        message: ''
      }
    default:
      return state
  }
}

const settingState = (state = {}, action) => {
  switch (action.type) {
    case LOCATION_REQUEST:
      return {
        ...state,
        loading: true,
        permissionLocation: false,
        location: null
      }
    case LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        permissionLocation: true,
        location: action.payload
      }
    case LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        permissionLocation: false,
        location: null
      }
    case SET_RADIUS:
      return {
        ...state,
        radius: action.payload
      }
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload
      }
    default:
      return state
  }
}

export { userState, settingState }
