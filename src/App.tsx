import './App.css'
import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'

const SERVER_URL = 'http://localhost:5005/'

function App() {
  const [selectedImage, setSelectedImage] = useState<any>()
  const [imageUrl, setImageUrl] = useState<string>('')

  /**
   * on image selection
   * @param e
   */
  const onImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // set selected image if file was actually selected
    if (e.target.files && e.target.files.length > 0) {
      console.log(e.target.files[0])
      setSelectedImage(e.target.files[0])
    }
  }

  /**
   * upload selected image
   */
  const uploadImage = () => {
    if (selectedImage) {
      // create and update form data
      const formData = new FormData()
      formData.append('file', selectedImage)

      // send form data
      const url = SERVER_URL + 'upload_image'
      axios
        .post(url, formData)
        .then(() => {
          alert('Image uploaded')
          setSelectedImage(null)
        })
        .catch(() => {
          alert('Something went wrong with the upload')
        })
    }
  }

  const onUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
  }

  /**
   * upload image using a url
   */
  const uploadImageUrl = () => {
    if (imageUrl !== '') {
      const data = {
        url: imageUrl,
      }

      // send form data
      const url = SERVER_URL + 'upload_image'
      axios
        .post(url, data)
        .then(() => {
          alert('Image uploaded')
          setSelectedImage(null)
        })
        .catch(() => {
          alert('Something went wrong with the upload')
        })
    }
  }

  return (
    <div className="page">
      <div>
        <h1 className="text-4xl py-5 font-bold">Upload an Image</h1>
        <p className="separator-text">Either from you local device</p>

        <div className="flex flex-row gap-3 content-center items-center">
          <label className="block">
            <span className="sr-only">Select image</span>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold
                      file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-100"
              type={'file'}
              accept="image/*"
              onChange={onImageFileChange}
            />
          </label>
          <div>
            <button className="btn" onClick={uploadImage}>
              Upload
            </button>
          </div>
        </div>

        <p className="separator-text">Or from a source url.</p>
        <div className="flex flex-row gap-3 content-center items-center">
          <div className="basis-3/4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Image url"
              value={imageUrl}
              onChange={onUrlChange}
            />
          </div>
          <div className="basis-1/4">
            <button className="btn" onClick={uploadImageUrl}>
              upload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
