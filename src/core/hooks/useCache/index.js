import AsyncStorage from '@react-native-async-storage/async-storage'
import { withNull } from 'exp-value'
import { Platform } from 'react-native'

// 864000000 = 10 ngày

export default {
  set: async function (key, data, expired = 60 * 864000000) {
    try {
      const dx = {
        data,
        expired: new Date().getTime() + expired
      }

      const json = JSON.stringify(dx)

      AsyncStorage.setItem(key, json)
    } catch (error) {
      console.log('STORAGE SET]Error->', error)
    }
  },
  get: async function (key) {
    try {
      const json = await AsyncStorage.getItem(key)
      const dx = JSON.parse(json)

      if (dx) {
        const expired = new Date(dx.expired)

        if (expired < new Date()) {
          return
        }

        return withNull('data', dx)
      }

      return withNull('data', dx)
    } catch (error) {
      console.log('STORAGE GET]Error->', error)
    }
  },
  clear: async function () {
    try {
      const keys = await AsyncStorage.getAllKeys()

      if (Platform.OS === 'android') {
        await AsyncStorage.clear()

        return
      }

      await AsyncStorage.multiRemove(keys)
    } catch (error) {
      console.log('[STORAGE CLEAR]Error->', error)
    }
  }
}
