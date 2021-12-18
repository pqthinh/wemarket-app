import React from 'react'
import { View, FlatList, SafeAreaView } from 'react-native'
import { Layout, TopNavigation, Text } from '@ui-kitten/components'
import { renderRightActions } from 'components/Header'
import NotifyData from './fakeData'
import NotifyItems from './notifyItems'

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
          style={{
            borderBottomColor: '#F8F8F8',
            borderBottomWidth: 3
          }}
        />
      </Layout>
      <Layout>
        <FlatList
          data={NotifyData}
          renderItem={({ item, key }) => (
            <NotifyItems item={item} index={key} />
          )}
          keyExtractor={(_, index) => index.toString()}
        />
      </Layout>
    </SafeAreaView>
  )
}
export default NotifyScreen
