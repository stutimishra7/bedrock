import React, { useEffect, useState } from 'react'
import TickGreenCircular from '../../../assets/images/Icons/TickGreenCircular.svg'
import CrossGreenCircular from '../../../assets/images/Icons/CrossGreenCircular.svg'

import TextXs from '../../atoms/Text/TextXs'
import LoadingBar from './LoadingBar'
import { fileUploadRequest } from '../../../utils/helpers'
import { useDispatch } from 'react-redux'
import { uploadFile } from '../../../store/actions/quizActions/quizActions'
import ImageTag from '../../atoms/ImageTag'

function FileBar ({ file, removeFile, setDisabled ,folderName, finalSubmit}) {
  const dispatch = useDispatch()
  const [progress, setProgress] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [uploadedUrl, setUploadedUrl] = useState('')

  const uploadProgressEmitter = (progressEvent) => {
    setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total))
  }

  useEffect(() => {
    async function uploadFileToServer () {
      setDisabled(true)
      const formData = new FormData()
      formData.append('folderName', folderName)
      formData.append('image', file)
      let res
      try {
        res = await fileUploadRequest(
          '/upload',
          formData,
          uploadProgressEmitter
        )
        
      } catch (error) {
        console.log(error)
        return
        
      }
      
      setUploadedUrl(res.data.url)
      dispatch(uploadFile({ url: res.data.url }))
      setDisabled(false)
    }
    if (finalSubmit === true){
      uploadFileToServer()

    }
    return () => {
    }
  }, [finalSubmit])

  return (
        <div
            className="bg-white rounded-xl border px-2 md:px-5 py-4 mb-3 flex flex-row items-center w-full"
            // style={{ backgroundColor: progress === 100 ? '#FFFFFF' : '' }}
        >
            {progress === 100
              ? (
                <ImageTag
                src={TickGreenCircular}
                className="w-4 sm:w-5 mr-2"
            />
                )
              : null}

            <TextXs text={file.name.substring(0, 30) + ((file.name.length > 30) ? '...' : '')} className="" />

            <div className="flex-1 flex flex-row justify-end items-center w-full">
                {progress === 100
                  ? (
                    <TextXs text={bytesToSize(file.size)} />
                    )
                  : (
                    <LoadingBar progress={progress} />
                    )}

                <ImageTag
                    src={CrossGreenCircular}
                    className="w-5 ml-2 cursor-pointer justify-self-end rounded-full"
                    onClick={() => removeFile(file, uploadedUrl)}
                />
            </div>
        </div>
  )
}

// eslint-disable-next-line no-unused-vars
function bytesToSize (bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`
}

export default React.memo(FileBar)
