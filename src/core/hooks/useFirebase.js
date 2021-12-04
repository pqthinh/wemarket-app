import { storage } from 'configs/firebaseConfig'

const useFirebase = (imageAsFile, bucket = '/images/') => {
  var link = ''
  console.log(imageAsFile, 'images')
  const uploadTask = storage
    .ref(`${bucket + imageAsFile.fileName}`)
    .put(imageAsFile)

  uploadTask.on(
    'state_changed',
    snapShot => {
      //takes a snap shot of the process as it is happening
      console.log(snapShot)
    },
    err => {
      //catches the errors
      console.log(err)
    },
    () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage
        .ref('images')
        .child(imageAsFile.fileName)
        .getDownloadURL()
        .then(fireBaseUrl => {
          link = fireBaseUrl
        })
    }
  )
  return link
}

export default useFirebase
