import React from 'react'
import { ScrollView } from 'react-native'
import {
  Section,
  SectionName,
  LoadMoreWrapper,
  TextLoadMore,
  Icon
} from './styled'

const WrapperContent = ({
  name,
  bannerComponent,
  horizontal = false,
  children,
  loadMore = false,
  loadMoreAction,
  ...rest
}) => {
  return (
    <Section>
      {bannerComponent}
      <SectionName>{name}</SectionName>
      {children}
      {loadMore ? (
        <LoadMoreWrapper
          onClick={() => {
            if (typeof loadMoreAction === 'function') loadMoreAction()
          }}
        >
          <Icon name='arrow-right-circle' size={32} />
          <TextLoadMore>Tải thêm</TextLoadMore>
        </LoadMoreWrapper>
      ) : null}
    </Section>
  )
}

export default React.memo(WrapperContent)
