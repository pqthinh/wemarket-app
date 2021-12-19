import { withEmpty, withNull } from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  Linking,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  View
} from 'react-native'
import { Text } from '@ui-kitten/components'
import SliderImage from 'components/SliderImage'
import ListComment from 'components/CommentComponent/ListComment'
import { Icon, styles } from './styled'
import UserPreviewComponent from 'components/CommentComponent/UserPreviewComponent'
import moment from 'moment'

const ProductScreen = ({ navigation, route }) => {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const r = withNull('params.product', route)
    if (r) return setProduct(r)
    return null
  }, [route])

  const _renderComment = useCallback(() => {
    return <ListComment />
  }, [product])

  React.useLayoutEffect(() => {
    navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } })
    navigation.setOptions({
      title: <Text style={styles.title}>{withEmpty('name', product)}</Text>,
      headerRight: () => (
        <View style={styles.IconWrapper}>
          <Icon
            name='phone-call'
            size={24}
            style={styles.IconWrapper}
            onPress={() =>
              Linking.openURL(
                `tel: ${withEmpty('phone', product) || '0866564502'}`
              )
            }
          />
          <Icon
            name='more-vertical'
            size={24}
            style={styles.IconWrapper}
            onPress={() => {
              console.log('more')
            }}
          />
        </View>
      )
    })
  }, [product, route])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <SliderImage style={{ width: '100%', height: 250 }} />

        <View style={styles.blockName}>
          <Text style={styles.title}>{withEmpty('name', product)}</Text>
          <Text style={styles.money}>
            {'Giá bán: ' + withEmpty('price', product)}
          </Text>
          <Text style={styles.time}>
            {'Ngày đăng tin: ' +
              moment(new Date(withEmpty('updatedAt', product))).format(
                'hh:mm DD:MM:yyyy'
              )}
          </Text>
          <Text> {'Địa chỉ: ' + withEmpty('address', product)}</Text>

          <View style={styles.function}>
            <View style={styles.IconWrapper}>
              <Icon
                name='shopping-cart'
                size={24}
                style={styles.IconWrapper}
                onPress={() => {}}
              />
            </View>
            <View>
              <Icon
                name='heart'
                size={24}
                style={styles.IconWrapper}
                onPress={() => {}}
              />
            </View>
          </View>
        </View>

        <View>
          <UserPreviewComponent />
        </View>

        <View style={styles.description}>
          <Text>{withEmpty('description', product)}</Text>
        </View>

        <View>{_renderComment()}</View>
      </ScrollView>
      <View style={styles.bottomScreen}>
        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => Linking.openURL(`tel: ${product.phone}`)}
        >
          <Text style={{ color: '#000' }}>Gọi điện</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => Linking.openURL(`sms: ${product.phone}`)}
        >
          <Text style={{ color: 'black' }}>Nhắn tin</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.flexRow}
          onPress={() => {
            Alert.alert('', 'Chat với người bán', [
              {
                text: 'Hủy',
                onPress: () => {
                  return
                },
                style: 'cancel'
              },
              {
                text: 'Tiếp tục',
                onPress: () => {
                  navigation.navigate('ChatStack', {
                    screen: 'ChatDetail',
                    params: {
                      title: `${withEmpty('username', product)}`,
                      phone: `${withEmpty('phone', product)}`,
                      id: product.id
                    }
                  })
                }
              }
            ])
          }}
        >
          <Text style={{ color: '#000' }}>Chat online</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ProductScreen
