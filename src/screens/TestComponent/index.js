import { Button, Layout, Text } from '@ui-kitten/components'
import React from 'react'
import { SafeAreaView, ScrollView } from 'react-native'
import { useTheme } from 'stores/theme-context'
import { logout } from 'actions/userActions'
import { useDispatch } from 'react-redux'
import SelectInput from 'components/Form/SelectInput'
import ProductItem from 'components/ProductItem'
import SliderImage from 'components/SliderImage'
import Category from 'components/Category'
import WrapperContent from 'components/WrapperContent'
import { ProductContainer } from './styled'

export const HomeScreen = ({ navigation }) => {
  const { toggleTheme, theme } = useTheme()
  const dispatch = useDispatch()
  const navigateDetails = () => {
    navigation.navigate('Details')
  }
  const toggleMap = () => {
    navigation.navigate('Map')
  }
  const toggleUserMap = () => {
    navigation.navigate('MapSelect')
  }

  const signOut = () => {
    dispatch(logout())
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <SliderImage />

        <Category />

        <WrapperContent name={'Sản phẩm mới'} horizontal={true}>
          <ProductItem />
        </WrapperContent>

        <WrapperContent
          name={'Gợi ý hôm nay'}
          stickyHeaderHiddenOnScroll={true}
        >
          <ProductContainer>
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </ProductContainer>
        </WrapperContent>

        <Layout
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <SelectInput />
          <Text>{theme}</Text>
          <Button style={{ marginVertical: 4 }} onPress={navigateDetails}>
            OPEN DETAILS
          </Button>
          <Button style={{ marginVertical: 4 }} onPress={toggleTheme}>
            TOGGLE THEME
          </Button>
          <Button style={{ marginVertical: 4 }} onPress={toggleMap}>
            MAP
          </Button>
          <Button style={{ marginVertical: 4 }} onPress={toggleUserMap}>
            User Map Screen
          </Button>
          <Button style={{ marginVertical: 4 }} onPress={signOut}>
            Sign out
          </Button>
        </Layout>
      </ScrollView>
    </SafeAreaView>
  )
}