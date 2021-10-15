import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT
} from '../actions/userActions'

const initializeState = {
  userInfo: {}
}

export default function UserReducers(state = initializeState, action) {
  console.log(action, state)
  switch (action.type) {
    case SIGNUP_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
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
        loading: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload
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
        type: LOGOUT
      }
    default:
      return state
  }
}
