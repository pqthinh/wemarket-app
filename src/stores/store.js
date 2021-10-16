import { createStore, applyMiddleware, compose } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { composeWithDevTools } from 'remote-redux-devtools'
import rootReducer from 'reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const initialState = {}
const composeEnhancers = composeWithDevTools || compose

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
)

export const persistor = persistStore(store)
