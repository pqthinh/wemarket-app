import React from 'react'
import { StyleSheet } from 'react-native'
import {
  IndexPath,
  Layout,
  Select,
  SelectGroup,
  SelectItem
} from '@ui-kitten/components'

export const SelectInput = ({
  multiSelect = false,
  data = ['Developer', 'Designer', 'Product Manager'],
  groupedData = {
    'UI/UX': ['Frontend Developer', 'Designer'],
    Management: ['Product Manager', 'Business Analyst']
  },
  selected,
  multiSelected,
  onChange,
  ...others
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0))
  const [multiSelectedIndex, setMultiSelectedIndex] = React.useState([
    new IndexPath(0, 0),
    new IndexPath(1, 1)
  ])

  const displayValue = data[selectedIndex.row]
  const groupDisplayValues = multiSelectedIndex.map(index => {
    const groupTitle = Object.keys(groupedData)[index.section]
    return groupedData[groupTitle][index.row]
  })

  const renderOption = (title, index) => (
    <SelectItem title={title} key={index} />
  )

  const renderGroup = (title, index) => (
    <SelectGroup title={title} key={index}>
      {groupedData[title].map(renderOption)}
    </SelectGroup>
  )

  return (
    <Layout style={styles.container} level='1'>
      {!multiSelect && (
        <Select
          style={styles.select}
          placeholder='Default'
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={index => {
            setSelectedIndex(index)
            onChange(index)
          }}
        >
          {data.map(renderOption)}
        </Select>
      )}

      {multiSelect && (
        <Select
          style={styles.select}
          multiSelect={true}
          placeholder='Multi'
          value={groupDisplayValues.join(', ')}
          selectedIndex={multiSelectedIndex}
          onSelect={index => {
            onChange(index)
            setMultiSelectedIndex(index)
          }}
        >
          {Object.keys(groupedData).map(renderGroup)}
        </Select>
      )}
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 192
  },
  select: {
    flex: 1,
    margin: 2
  }
})
