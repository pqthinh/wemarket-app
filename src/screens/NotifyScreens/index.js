import React from 'react'
import { View, FlatList, SafeAreaView } from 'react-native'
import { Layout, TopNavigation, Text } from '@ui-kitten/components'
import { renderRightActions } from 'components/Header'
const NotifyScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout level='3'>
        <TopNavigation
          alignment='center'
          title={() => (
            <Text style={{ fontSize: 20, color: 'black' }}>Thông báo</Text>
          )}
          accessoryRight={renderRightActions}
          //style={{ backgroundColor: '#F2F3F7' }}
        />
      </Layout>
      <View>
        <Text> Test </Text>
      </View>
    </SafeAreaView>
  )
}
export default NotifyScreen
