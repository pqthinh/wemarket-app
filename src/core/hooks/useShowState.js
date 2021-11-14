import { useState } from 'react'

export default useShowState = (initialOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const onToggle = () => {
    setIsOpen(prevState => !prevState)
  }

  return [isOpen, onToggle]
}
