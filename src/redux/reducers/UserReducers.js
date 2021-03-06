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
  SET_CATEGORY,
  TOGGLE_BOTTOM
} from '../actionTypes/userActionTypes'
import {
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAILED
} from '../actionTypes/profileActionType'

const userState = (state = { loading: false, userInfo: {} }, action) => {
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
    case UPDATE_AVATAR_SUCCESS:
      return {
        ...state,
        userInfo: { ...state.userInfo, avatar: action.payload }
      }
    case UPDATE_AVATAR_FAILED:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

const settingState = (
  state = {
    loading: false,
    geolocation: { lat: 21.0378383, lng: 105.7833717, address: 'Hà Nội' },
    location: { lat: 21.0378383, lng: 105.7833717, address: 'Hà Nội' },
    radius: 10,
    category: 1,
    hiddenBottom: false
  },
  action
) => {
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
    case TOGGLE_BOTTOM:
      return {
        ...state,
        hiddenBottom: action.payload
      }
    default:
      return state
  }
}

const history = (state = {}, action) => {
  if (action.type == 'SEARCH') {
    return {
      ...state,
      ...{
        content: action.payload,
        date: new Date()
      }
    }
  }
  return state
}

export { userState, settingState, history }
