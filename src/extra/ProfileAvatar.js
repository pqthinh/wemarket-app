import { Avatar } from '@ui-kitten/components'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet, View } from 'react-native'

export const ProfileAvatar = ({ style, editButton, ...restProps }) => {
  const renderEditButtonElement = () => {
    const buttonElement = editButton()

    return React.cloneElement(buttonElement, {
      style: [buttonElement.props.style, styles.editButton]
    })
  }

  return (
    <View style={style}>
      <Avatar style={[style, styles.avatar]} {...restProps} />
      {editButton && renderEditButtonElement()}
    </View>
  )
}

ProfileAvatar.propTypes = {
  style: PropTypes.any,
  editButton: PropTypes.any
}

const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'center'
  },
  editButton: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 0
  }
})
