import { uploadImage } from 'utils/helper'
import { firebase } from 'configs/firebaseConfig'

const useFirebase = async file => {
  let userState = firebase.auth().currentUser
  const response = await fetch(file.uri)
  const blob = await response.blob()
  const downloadURL = await uploadImage(
    `images/${userState?.uid}/avatar/${file.fileName}`,
    blob
  )

  return downloadURL
}

export default useFirebase
