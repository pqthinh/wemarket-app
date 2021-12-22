import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import { Text } from '@ui-kitten/components'
const SettingMap = () => {
  return (
    <View>
      <Text>imager</Text>
      <Image
        source={{
          uri: `https://external.fhan4-3.fna.fbcdn.net/static_map.php?v=2022&theme=default&ccb=4-4&size=516x308&language=en_US&scale=1&zoom=9&center=21.0669720539,105.744671205&marker_list[0]=21.0669720539,105.744671205&circle=weight:2|color:0x4D6AA47f|fillcolor:0x4D6AA41c|21.0669720539,105.744671205|50k`
        }}
        style={{ width: '100%', height: 250, resizeMode: 'contain' }}
      />
    </View>
  )
}

export default SettingMap

const styles = StyleSheet.create({})
