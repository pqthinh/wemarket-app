import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, styled } from '@ui-kitten/components'

export class TopNavigationComponent extends React.Component {
  static styledComponentName = 'TopNavigation'

  getAlignmentDependentStyles = alignment => {
    if (alignment === 'center') {
      return {
        container: styles.containerCentered,
        titleContainer: styles.titleContainerCentered
      }
    }

    return {
      rightControlsContainer: styles.rightControlsContainerStart
    }
  }

  getComponentStyle = source => {
    const {
      titleTextAlign,
      titleFontFamily,
      titleFontSize,
      titleLineHeight,
      titleFontWeight,
      titleColor,
      subtitleTextAlign,
      subtitleFontFamily,
      subtitleFontSize,
      subtitleLineHeight,
      subtitleFontWeight,
      subtitleColor,
      ...containerParameters
    } = source

    return {
      container: containerParameters,
      titleContainer: {},
      title: {
        textAlign: titleTextAlign,
        fontFamily: titleFontFamily,
        fontSize: titleFontSize,
        lineHeight: titleLineHeight,
        fontWeight: titleFontWeight,
        color: titleColor
      },
      subtitle: {
        textAlign: subtitleTextAlign,
        fontFamily: subtitleFontFamily,
        fontSize: subtitleFontSize,
        color: subtitleColor,
        fontWeight: subtitleFontWeight,
        lineHeight: subtitleLineHeight
      },
      leftControlContainer: {},
      rightControlsContainer: {}
    }
  }

  renderTextElement = (text, style) => {
    return <Text style={style}>{text}</Text>
  }

  renderActionElements(source) {
    return React.Children.map(source, (element, index) => {
      return React.cloneElement(element, {
        key: index,
        appearance: this.props.appearance
      })
    })
  }

  renderComponentChildren = style => {
    const {
      title,
      subtitle,
      leftControl,
      rightControls,
      titleStyle,
      subtitleStyle
    } = this.props

    const isValidString = value => typeof value === 'string' && value.length > 0

    return [
      isValidString(title) &&
        this.renderTextElement(title, [style.title, styles.title, titleStyle]),
      isValidString(subtitle) &&
        this.renderTextElement(subtitle, [
          style.subtitle,
          styles.subtitle,
          subtitleStyle
        ]),
      leftControl && this.renderActionElements(leftControl),
      rightControls && this.renderActionElements(rightControls)
    ]
  }

  render() {
    const { themedStyle, style, alignment, children, ...restProps } = this.props

    const {
      container,
      leftControlContainer,
      titleContainer,
      rightControlsContainer,
      ...componentStyles
    } = this.getComponentStyle(themedStyle)

    const alignmentStyles = this.getAlignmentDependentStyles(alignment)

    const [
      titleElement,
      subtitleElement,
      leftControlElement,
      rightControlElements
    ] = this.renderComponentChildren(componentStyles)

    return (
      <View
        style={[container, styles.container, alignmentStyles.container, style]}
        {...restProps}
      >
        <View style={[leftControlContainer, styles.leftControlContainer]}>
          {leftControlElement}
        </View>
        <View
          style={[
            titleContainer,
            styles.titleContainer,
            alignmentStyles.titleContainer
          ]}
        >
          {titleElement}
          {subtitleElement}
          {children}
        </View>
        <View
          style={[
            rightControlsContainer,
            styles.rightControlsContainer,
            alignmentStyles.rightControlsContainer
          ]}
        >
          {rightControlElements}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerCentered: {
    justifyContent: 'space-between'
  },
  titleContainer: {},
  titleContainerCentered: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {},
  subtitle: {},
  leftControlContainer: {
    flexDirection: 'row',
    zIndex: 1
  },
  rightControlsContainer: {
    flexDirection: 'row',
    zIndex: 1
  },
  rightControlsContainerStart: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})

export const TopNavigation = styled(TopNavigationComponent)
