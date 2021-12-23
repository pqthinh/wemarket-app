import Slider from '@react-native-community/slider'
import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components'
import { getRadius, toggleBottom } from 'actions/userActions'
import { withEmpty } from 'exp-value'
import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getImageMap } from 'configs/api/apiPath'

const SettingMap = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const setting = useSelector(state => {
    return state.settingState
  })
  const [radius, setRadius] = useState(20)
  const [url, setUrl] = useState(
    `https://external.fhan4-3.fna.fbcdn.net/static_map.php?v=2022&theme=default&ccb=4-4&size=516x516&language=en_US&scale=1&zoom=9&center=21.0669720539,105.744671205&marker_list[0]=21.0669720539,105.744671205&circle=weight:2|color:0x4D6AA47f|fillcolor:0x4D6AA41c|21.0669720539,105.744671205|50k`
  )

  React.useEffect(() => {
    const imageMap = getImageMap(
      withEmpty('location.latitude', setting),
      withEmpty('location.longitude', setting),
      radius
    )
    if (imageMap) setUrl(imageMap)
  }, [setting.location, radius])

  React.useEffect(() => {
    dispatch(toggleBottom(true))
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Layout level='3'>
        <TopNavigation
          accessoryLeft={
            <TopNavigationAction
              icon={<Icon name='arrow-back' />}
              onPress={() => {
                dispatch(toggleBottom(false))
                navigation.goBack()
              }}
            />
          }
          title={evaProps => (
            <Text style={styles.titleScreen} {...evaProps}>
              Vị trí
            </Text>
          )}
        />
      </Layout>
      <Divider />
      <Layout>
        <Input
          style={{
            paddingHorizontal: 10,
            backgroundColor: '#F2F3F7',
            marginVertical: 10,
            borderRadius: 10
          }}
          size='medium'
          placeholder='Medium'
          placeholder='Thay đổi vị trí'
          value={withEmpty('location.address', setting)}
          onPressIn={() => navigation.navigate('MapSelect')}
          accessoryLeft={<Icon name='arrow-back' />}
        />
      </Layout>
      <Image
        source={{
          uri: url
        }}
        style={styles.map}
      />

      <Layout style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 20 }}>
        <Text>Tuỳ chỉnh bán kính</Text>
        <Layout style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.8 }}>
            <Slider
              maximumValue={100}
              minimumValue={1}
              color='#E26740'
              minimumTrackTintColor='#E26740'
              maximumTrackTintColor='#000000'
              step={1}
              value={radius}
              onValueChange={radius => setRadius(radius)}
            />
          </View>

          <Text style={{ flex: 0.2 }}>{radius} km</Text>
        </Layout>
        <Divider />
        <Layout style={{ paddingVertical: 40, paddingHorizontal: 20 }}>
          <Button onPress={() => dispatch(getRadius())}>Áp dụng</Button>
        </Layout>
      </Layout>
    </ScrollView>
  )
}

export default SettingMap

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  search: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderColor: '#fff'
  },
  titleScreen: {
    fontSize: 16
  },
  map: { width: '100%', height: 400, resizeMode: 'contain' }
})
