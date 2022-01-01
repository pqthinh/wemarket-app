import axios from 'axios'
import { firebase } from 'configs/firebaseConfig'
import { store } from 'stores/store'
import { showAlert } from 'actions/userActions'
const { dispatch } = store
let loginAlert = false

const instance = axios.create({
  baseURL: 'https://wemarket-api.herokuapp.com/api'
})

instance.interceptors.request.use(
  async config => {
    try {
      const ss = await firebase.auth().currentUser
      const token = ss ? ss?.getIdToken(true) : ''
      config.headers = {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      }
      return config
    } catch (e) {}
  },
  error => {
    return Promise.reject(error)
  }
)

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    return response
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      try {
        const ss = await firebase.auth().currentUser

        const token = ss ? ss?.getIdToken(true) : ''

        error.config.headers['Authorization'] = `Bearer ${token}`
        error.config.headers['Content-Type'] = 'application/json'
        error.config.baseURL = undefined

        return instance.request(error.config)
      } catch (e) {
        if (!loginAlert) {
          loginAlert = true
          dispatch(showAlert())
        }
      }
    }

    return Promise.reject(error)
  }
)

export default instance
