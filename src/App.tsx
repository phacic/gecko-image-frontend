import './App.css'

import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'

const SERVER_URL = 'http://localhost:5005'

interface ImageModel {
  id: string
  url: string
}

interface ImageProp {
  image: ImageModel
  analyse: (id: string) => void
}
const Image = (props: ImageProp) => {

  const onClick = () => {
    props.analyse(props.image.id)
  }

  return (
    <div className="flex flex-col">
      <div>
        <img
          src={SERVER_URL + props.image.url}
          alt={'image-' + props.image.id}
          height={'100%'}
          width={'auto'}
        />
      </div>
      <div className="mt-1">
        <button
          onClick={() => {
            props.analyse(props.image.id)
          }}
          className="text-sm font-semibold text-gray-500 bg-transparent rounded dark:text-purple-200">
          Analyse
        </button>
      </div>
    </div>
  )
}

function App() {
  const [selectedImage, setSelectedImage] = useState<any>()
  const [imageUrl, setImageUrl] = useState<string | null>('')
  const [images, setImages] = useState<ImageModel[]>([])

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = () => {
    // fetch all images
    const url = SERVER_URL + '/list_images'
    axios
      .get(url)
      .then((resp) => {
        setImages(resp.data)
      })
      .catch(() => {
        alert('Something went wrong while fetching images.')
      })
  }

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
   * actual image upload
   * @param data: form data or json
   */
  const uploadImage = (data: any) => {
    const url = SERVER_URL + '/upload_image'
    axios
      .post(url, data)
      .then(() => {
        alert('Image uploaded')
        setSelectedImage(null)
        setImageUrl(null)

        // fetch all images
        fetchImages()
      })
      .catch(() => {
        alert('Something went wrong with the upload')
      })
  }

  /**
   * upload selected image
   */
  const uploadImageFile = () => {
    if (selectedImage) {
      // create and update form data
      const formData = new FormData()
      formData.append('file', selectedImage)
      // send data
      uploadImage(formData)
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

      uploadImage(data)
    }
  }

  /**
   * analyse an image
   * @param id: string
   */
  const analyseImage = (id: string) => {
    const url = SERVER_URL + `/analyse_image?image_id=${id}`
    axios
      .get(url)
      .then((resp) => {
        const data = resp.data
        const msg = `Image is ${data.width} X ${data.height}`
        alert(msg)
      })
      .catch(() => {
        alert('Something went wrong while analyzing image')
      })
  }

  return (
    <div className="page">
      <div>
        <h1 className="py-5 text-4xl font-bold">Upload an Image</h1>
        <p className="separator-text">Either from you local device</p>

        <div className="flex flex-row items-center content-center gap-3">
          <label className="block">
            <span className="sr-only">Select image</span>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-100"
              type={'file'}
              accept="image/*"
              onChange={onImageFileChange}
            />
          </label>
          <div>
            <button className="btn" onClick={uploadImageFile}>
              Upload
            </button>
          </div>
        </div>

        <p className="separator-text">Or from a source url.</p>
        <div className="flex flex-row items-center content-center gap-3">
          <div className="basis-3/4">
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

        <h2 className="pb-6 text-3xl font-bold pt-9">Images</h2>
        <div className="grid grid-cols-3 gap-5">
          {images.map((im) => (
            <Image key={im.id} image={im} analyse={analyseImage} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
