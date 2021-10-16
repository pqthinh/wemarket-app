import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from '../actionTypes/userActionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true,
        userInfo: {},
        message: null
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        message: null
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
        message: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        message: null
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
        userInfo: {},
        loading: false,
        type: action.type,
        message: null
      }
    default:
      return state
  }
}
