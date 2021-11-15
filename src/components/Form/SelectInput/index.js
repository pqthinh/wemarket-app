import React from 'react'
import {
  IndexPath,
  Layout,
  Select,
  SelectGroup,
  SelectItem
} from '@ui-kitten/components'
import { ContainerSelect, SelectWrapper } from './styled'

const SelectInput = ({
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
    <ContainerSelect level='1'>
      {!multiSelect && (
        <SelectWrapper
          placeholder='Default'
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={index => {
            setSelectedIndex(index)
            onChange(index)
          }}
        >
          {data.map(renderOption)}
        </SelectWrapper>
      )}

      {multiSelect && (
        <SelectWrapper
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
        </SelectWrapper>
      )}
    </ContainerSelect>
  )
}
export default React.memo(SelectInput)
