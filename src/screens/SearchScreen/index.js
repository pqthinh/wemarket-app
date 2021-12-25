import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { styles } from './styles'
import {
  Layout,
  Text,
  TopNavigationAction,
  TopNavigation
} from '@ui-kitten/components'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { historySearch, toggleBottom } from 'actions/userActions'

const SearchScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(toggleBottom(true))
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout level='3'>
        <TopNavigation
          alignment='center'
          accessoryLeft={
            <TopNavigationAction
              icon={<Icon name='arrow-back' />}
              onPress={() => {
                dispatch(toggleBottom(false))
                navigation.goBack()
              }}
            />
          }
          title={() => <SearchComponent />}
        />
      </Layout>

      <Text>Search</Text>
    </SafeAreaView>
  )
}

export default SearchScreen
