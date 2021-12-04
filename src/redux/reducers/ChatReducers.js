import {
  USER_STATE_CHANGE,
  FETCH_ROOM_SUCCESS,
  FETCH_ROOM_ERROR,
  REGISTER_ROOM,
  GET_LIST_CHAT_SUCCESS,
  GET_LIST_CHAT_FAILED,
  GET_CONTENT_CHAT
} from '../actionTypes/chatActionType'

const INITIAL = {
  loading: true,
  messages: [],
  id: null,
  error: null,
  name: null,
  chatList: [],
  users: []
}

const manageChat = (state = INITIAL, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser
      }
    case FETCH_ROOM_SUCCESS:
      return { ...state, loading: false, id: action.id, name: action.name }
    case FETCH_ROOM_ERROR:
      return { ...state, loading: false, error: action.error }
    case REGISTER_ROOM:
      return { ...state, loading: false, id: action.id, name: action.name }
    case GET_LIST_CHAT_SUCCESS:
      return { ...state, loading: false, chatList: action.chatList }
    case GET_LIST_CHAT_FAILED:
      return { ...state, loading: false, error: action.error }
    case GET_CONTENT_CHAT:
      return {
        ...state,
        loading: false,
        messages: action.messages,
        users: action.users
      }
    default:
      return state
  }
}
export { manageChat }
