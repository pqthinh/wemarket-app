import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
  Toggle,
  TopNavigation
} from '@ui-kitten/components'
import ModalLogin from 'components/ModalLogin'
import EditModal from 'components/ProfileUser/EditModal'
import { useShowState } from 'core/hooks'
import {
  withArray,
  withBoolean,
  withEmpty,
  withNumber,
  withObject
} from 'exp-value'
import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ImageBackground,
  useWindowDimensions,
  View
} from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { useSelector } from 'react-redux'
import { uploadImage } from 'utils/helper'
import { category } from 'utils/map/category'
import ModalConfirm from './ModalConfirm'
import { styles } from './styles'

const CreateProductScreen = () => {
  const navigation = useNavigation()
  const userState = useSelector(state => {
    return withObject('userState.userInfo', state)
  })
  const setting = useSelector(state => {
    return state.settingState
  })
  const { width } = useWindowDimensions()
  const [file, setFile] = useState([])
  const [isModalVisible, toggleImageModal] = useShowState()
  const [showModal, setShowModal] = useState(false)
  const initialData = {
    title: '',
    description: '',
    price: '',
    categoryId: 0,
    categoryName: '',
    location: {
      lat: withEmpty('location.latitude', setting),
      lng: withEmpty('location.longitude', setting),
      address: withEmpty('location.address', setting) || 'Hà Nội'
    },
    tag: [],
    ship: false,
    quality: '',
    quantity: 0,
    highlight: false,
    images: [],
    uid: withEmpty('uid', userState)
  }
  const [data, setData] = useState(initialData)
  const [tagInput, setTagInput] = useState()
  const [selectedIndex, setSelectedIndex] = useState()
  const [selectedStatus, setSelectedStatus] = useState()

  useEffect(() => {
    setData(prev => ({
      ...prev,
      location: {
        lat: withEmpty('location.latitude', setting),
        lng: withEmpty('location.longitude', setting),
        address: withEmpty('location.address', setting) || 'Hà Nội'
      }
    }))
  }, [setting.location])

  const _handleImagePicked = pickerResult => {
    if (pickerResult.assets) {
      setFile(prev => [...prev, ...withArray('assets', pickerResult)])
    } else if (pickerResult.didCancel) {
      console.log('User cancelled image picker')
    } else if (pickerResult.error) {
      console.log('ImagePicker Error: ', pickerResult.error)
    }
  }

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 10,
      mediaType: 'photo',
      includeBase64: false,
      multiple: true
    }
    launchImageLibrary(options, response => {
      _handleImagePicked(response)
    })
  }, [])

  const onCameraPress = useCallback(() => {
    const options = {
      saveToPhotos: false,
      mediaType: 'photo',
      includeBase64: false
    }
    launchCamera(options, response => {
      _handleImagePicked(response)
    })
  }, [])

  const removeImage = useCallback(
    index => {
      if (index == 0) return setFile([...file.slice(1)])
      return setFile([...file.splice(0, index), ...file.splice(index)])
    },
    [file]
  )
  const _handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }))
  }

  const _uploadImage = async () => {
    let imgs = [],
      bucket = Date.now()
    await file.forEach(async f => {
      console.log(f, 'file')
      const response = await fetch(f.uri)
      const blob = await response.blob()
      const downloadURL = await uploadImage(
        `images/${userState?.uid}/${bucket}/${f.fileName}`,
        blob
      )
      imgs.push(downloadURL)
    })
    await setData(prev => ({ ...prev, images: imgs }))
    setShowModal(true)
  }

  const _submit = async () => {
    await _uploadImage()
  }

  if (!userState.email) return <ModalLogin />
  return (
    <>
      <ScrollView>
        <Layout level={'3'}>
          <TopNavigation
            alignment='center'
            title={() => (
              <Text style={{ fontSize: 18, fontWeight: '700' }}>
                Tạo bài đăng bán sản phẩm
              </Text>
            )}
          />
        </Layout>
        <Divider />
        <Layout>
          <Layout
            style={styles.userRow}
            onStartShouldSetResponder={() => navigation.navigate('Profile')}
          >
            <View style={styles.userImage}>
              <Avatar
                rounded
                size='small'
                source={{
                  uri:
                    userState?.avatar ||
                    'https://thelifetank.com/wp-content/uploads/2018/08/avatar-default-icon.png'
                }}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16, fontWeight: '700' }}>
                {userState.username}
              </Text>
              <Text style={styles.title}>{userState?.email}</Text>
            </View>
          </Layout>

          <Layout style={styles.auto}>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={file}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => {
                return (
                  <View style={styles.imagePicker}>
                    <ImageBackground
                      source={{ uri: withEmpty('uri', item) }}
                      resizeMode='cover'
                      imageStyle={{ borderRadius: 10 }}
                      style={styles.imageItem}
                    >
                      <TouchableOpacity
                        onPress={() => removeImage(index)}
                        style={styles.icon}
                      >
                        <Icon
                          name='trash-outline'
                          pack='ionicons'
                          style={{ height: 24, color: '#E26740' }}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                )
              }}
              onEndReachedThreshold={0.5}
              ListFooterComponent={() => (
                <TouchableOpacity
                  style={[
                    styles.imagePicker,
                    { width: file.length == 0 ? width - 20 : 120 }
                  ]}
                  onPress={toggleImageModal}
                >
                  <Icon
                    name='images-outline'
                    pack='ionicons'
                    style={{ height: 24, color: '#000' }}
                  />
                  <Text style={styles.title}>Thêm ảnh</Text>
                </TouchableOpacity>
              )}
            />

            <Text style={styles.imageDes}>
              Ảnh: {withNumber('length', file)}/10 . Trước tiên chọn ảnh chính
              cho bài đăng sản phẩm của bạn. Thêm các ảnh ở nhiều góc chụp khác
              nhau để mọi người có thể hiểu hơn về sản phẩm này
            </Text>
          </Layout>

          <Layout style={{ marginHorizontal: 10 }}>
            <Input
              name='title'
              value={withEmpty('title', data)}
              label={() => <Text style={styles.label}>Tiêu đề</Text>}
              placeholder='Tiêu đề bài đăng'
              caption={
                <Text style={styles.title}>* Chọn một tiêu đề phù hợp</Text>
              }
              onChangeText={e => _handleChange('title', e)}
              style={styles.paddingVertical}
            />

            <Input
              name='price'
              keyboardType='numeric'
              value={withEmpty('price', data)}
              label={() => <Text style={styles.label}>Giá</Text>}
              placeholder='Giá'
              onChangeText={e => _handleChange('price', e)}
              style={styles.paddingVertical}
            />

            <Input
              name='quantity'
              keyboardType='numeric'
              value={withEmpty('quantity', data)}
              label={() => <Text style={styles.label}>Số lượng</Text>}
              placeholder='Số lượng'
              caption={<Text style={styles.title}>* Không bắt buộc</Text>}
              onChangeText={e => _handleChange('quantity', e)}
              style={styles.paddingVertical}
            />

            <Input
              name='address'
              value={withEmpty('location.address', data)}
              label={() => <Text style={styles.label}>Chọn vị trí</Text>}
              placeholder='Chọn vị trí'
              onPressIn={() => navigation.navigate('MapSelect')}
              style={styles.paddingVertical}
            />

            <Select
              selectedIndex={selectedIndex}
              value={withEmpty('categoryName', data)}
              onSelect={item => {
                setSelectedIndex(item)
                _handleChange('categoryName', category[item.row].name)
                _handleChange('categoryId', category[item.row].id)
              }}
              label={() => <Text style={styles.label}>Danh mục sản phẩm</Text>}
              placeholder='Danh mục sản phẩm'
              style={styles.paddingVertical}
            >
              {category.map((item, index) => {
                return (
                  <SelectItem
                    key={index}
                    title={item.name}
                    accessoryLeft={() => (
                      <Image
                        source={{ uri: item.icon }}
                        style={[styles.imgCategory, { width: 24 }]}
                      />
                    )}
                    accessoryRight={() => (
                      <Image
                        source={{ uri: item.image }}
                        style={styles.imgCategory}
                      />
                    )}
                  />
                )
              })}
            </Select>

            <Input
              name='description'
              multiline={true}
              value={withEmpty('description', data)}
              label={() => <Text style={styles.label}>Mô tả</Text>}
              placeholder='Mô tả'
              onChangeText={e => _handleChange('description', e)}
              style={styles.paddingVertical}
              textStyle={{ minHeight: 64 }}
            />

            <Layout>
              <Text style={styles.label}>Thẻ</Text>
              <Layout style={styles.tagWrapper}>
                {withArray('tag', data).map((item, index) => {
                  return (
                    <Text key={index} style={styles.tag}>
                      {item}
                    </Text>
                  )
                })}
              </Layout>
              <Input
                value={tagInput}
                placeholder='Thẻ tìm kiếm'
                onChangeText={setTagInput}
                style={styles.paddingVertical}
                accessoryRight={() => (
                  <Icon
                    name='plus-square'
                    fill='#E26740'
                    style={styles.iconCommon}
                    onPress={
                      tagInput
                        ? () => {
                            setData(prev => ({
                              ...prev,
                              tag: [...prev.tag, tagInput]
                            }))
                            setTagInput('')
                          }
                        : null
                    }
                  />
                )}
              />
            </Layout>

            <Select
              selectedIndex={selectedStatus}
              value={withEmpty('quality', data)}
              onSelect={item => {
                setSelectedStatus(item)
                _handleChange('quality', quality[item.row])
              }}
              label={() => (
                <Text style={styles.label}>Tình trạng sản phẩm</Text>
              )}
              placeholder='Tình trạng sản phẩm'
              style={styles.paddingVertical}
            >
              {quality.map((item, index) => {
                return <SelectItem title={item} key={index} />
              })}
            </Select>
          </Layout>
          <Layout style={{ marginHorizontal: 10, marginVertical: 20 }}>
            <Text style={styles.label}>Giao hàng</Text>
            <ListItem containerStyle={styles.row}>
              <Icon fill='#E26740' name='car' style={styles.iconCommon} />
              <ListItem.Content>
                <ListItem.Title>Có giao hàng</ListItem.Title>
              </ListItem.Content>
              <Toggle
                checked={withBoolean('ship', data)}
                onChange={e => _handleChange('ship', e)}
              />
            </ListItem>
            <ListItem style={styles.row}>
              <ListItem.Content>
                <ListItem.Title>Tạo highlight cho bài đăng này</ListItem.Title>
              </ListItem.Content>
              <Toggle
                checked={withBoolean('highlight', data)}
                onChange={e => _handleChange('highlight', e)}
              />
            </ListItem>
            <Button onPress={_submit}> Xác nhận đăng bài </Button>
          </Layout>
        </Layout>
        <ModalConfirm
          visible={showModal}
          setVisible={setShowModal}
          data={data}
          setData={setData}
          setFile={setFile}
          setTagInput={setTagInput}
          setSelectedIndex={setSelectedIndex}
          setSelectedStatus={setSelectedStatus}
          initialData={initialData}
        />
        <EditModal
          isModalVisible={isModalVisible}
          toggleModal={toggleImageModal}
          onImageLibraryPress={onImageLibraryPress}
          onCameraPress={onCameraPress}
        />
      </ScrollView>
    </>
  )
}

export default CreateProductScreen

const quality = [
  'Mới',
  'Đã qua sử dụng - Như mới',
  'Đã qua sử dụng - Tốt',
  'Đã qua sử dụng - Khá tốt'
]
