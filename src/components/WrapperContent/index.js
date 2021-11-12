import React from 'react'
import { ScrollView } from 'react-native'
import { Section, SectionName } from './styled'

const WrapperContent = ({
  name,
  bannerComponent,
  horizontal = false,
  children,
  ...rest
}) => {
  return (
    <Section>
      {bannerComponent}
      <SectionName>{name}</SectionName>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        {...rest}
      >
        {children}
      </ScrollView>
    </Section>
  )
}

export default React.memo(WrapperContent)
