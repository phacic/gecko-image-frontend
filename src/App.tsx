import './App.css'

import React, { ChangeEvent, useState } from 'react'

function App() {

  const [selectedImage, setSelectedImage] = useState<any>()

  const onImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0])

      console.log('selected image', selectedImage)
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
            <button className="btn">upload</button>
          </div>
        </div>

        <p className="separator-text">Or from a source url.</p>
        <div className="flex flex-row gap-3 content-center items-center">
          <div className="basis-3/4">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text" placeholder="Image url"
            />
          </div>
          <div className="basis-1/4">
            <button className="btn">upload</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
