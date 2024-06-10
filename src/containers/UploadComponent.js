import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { deleteFile, removeQuiz, updateQuestionCount } from '../store/actions/quizActions/quizActions'
// eslint-disable-next-line no-unused-vars
import { fileUploadRequest } from '../utils/helpers'
import GeneralButton from '../_atomic-design/atoms/Button/GeneralButton'
import HiddenInput from '../_atomic-design/atoms/Home/HiddenInput'
import TextInputGray from '../_atomic-design/molecules/Input/TextInputGray'
import FileBar from '../_atomic-design/molecules/CreateQuiz/FileBar'
import FileIcon from '../assets/images/Icons/FileIcon.svg'
import ImageTag from '../_atomic-design/atoms/ImageTag'
import {
  makeAuthenticatedServerRequest,
  makeServerRequest
} from '../utils/helpers'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function UploadComponent() {
  const dispatch = useDispatch()
  const quizObj = useSelector((state) => state.quizReducer)
  // const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn)

  const [searchParams] = useSearchParams()

  const [fileList, setFileList] = useState([])
  const [finalSubmit, setFinalSubmit] = useState(false)
  const [buttonName, setButtonName] = useState('upload to folder')
  const [apiData, setApiData] = useState('')
  const courseId = searchParams.get('courseId') || Date.now()
  const email = searchParams.get('email') || 'prasenjit@dkraftlearning.com'
  const navigate = useNavigate()


  const [name, setName] = useState('')
  const overlayRef = useRef(null)
  // eslint-disable-next-line no-unused-vars
  const [disabledCreatequiz, setDisabledCreatequiz] = useState(false)

  // eslint-disable-next-line no-unused-vars

  const wrapperRef = useRef(null)
  const onDragEnter = () => {
    overlayRef.current.style.opacity = 0.05
    wrapperRef.current.classList.add('dragover')
  }
  const onDragLeave = () => {
    overlayRef.current.style.opacity = 0
    wrapperRef.current.classList.remove('dragover')
  }

  const onDrop = () => { }
  const fileNameonChange = (e) => {
    console.log('fileNameonChange')
    let value = e.target.value
    // eslint-disable-next-line no-useless-escape
    value = value.replace(/[^A-Za-z\_]/ig, '')
    setName(value)
  }


  const onFileDrop = async (e) => {
    console.log('onFileDrop')
    if (name === '') {
      alert('Please first select a folder name.')
      return
    }
    // changeHeightFunc(true)
    const newFiles = e.target.files
    if (isLimitReached(newFiles)) {
      return
    }

    if (newFiles) {
      const updatedList = [...fileList, ...newFiles]
      setFileList(updatedList)
    }
  }

  const fileRemove = (file, url) => {
    console.log('fileRemove')
    setFileList(fileList.filter((item) => item !== file))
    dispatch(deleteFile({ url: url }))
  }

  const fetchQuizTesting = async () => {
    console.log('fetchQuizTesting')
    if (fileList.length === 0) {
      alert('Please upload atleast one file')
      return
    }
    // const res = await makeServerGETRequest('/quiz/', { quizId: '627822bc9ff08dcc0e0a2b3e' })
    let res
      res = await makeServerRequest('/upload/create', 'POST', {
        urls: quizObj.urls,
        BotName: name,
        courseId,
        email
      })
    console.log('response_ from_ml', res)

    if (res.status === 200) {
      setApiData(JSON.stringify(res.data, null, 2))
    } else {
      alert('Something went wrong')
    }
    setFinalSubmit(false)
    setFileList([])
    setButtonName('upload to folder')
    setDisabledCreatequiz(false)
  }

  const handleSubmit = async () => {
    console.log('handleSubmit')
    console.log(name)
    if (fileList.length > 0) {
      if (finalSubmit === true) {
        fetchQuizTesting()
      } else {
        setFinalSubmit(true)
        setButtonName('generate API')
      }

    } else {
      alert('A minimum of one file must be uploaded.')
    }
  }



  // const changeHeightFunc = (change) => {
  //   console.log('changeHeightFunc')
  //   const width = window.innerWidth
  //   if (change) {
  //     wrapperRef.current.style.height = width >= 640 ? '250px' : '180px'
  //   } else {
  //     wrapperRef.current.style.height = width >= 640 ? '350px' : '200px'
  //   }
  // }

  // To check if the file limit is reached for a particular user
  const isLimitReached = (newFiles) => {
    console.log('isLimitReached')
    const maxDocuments = 5
    const maxTotalFileSize = 15
    const totalFiles = newFiles.length + fileList.length
    const totalFilesSize = getFilesSize(newFiles)
    for (let i = 0; i < newFiles.length; i++) {
      if ((newFiles[i].type === 'application/pdf') || (newFiles[i].type === 'text/plain') || (newFiles[i].type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      } else {
        alert('You can only upload .docx,.pdf, or.txt files.')
        return true
      }
    }
    const errormessage45 = `You can only upload ${maxDocuments} files and max ${maxTotalFileSize}MB total, please upgrade to increase limit.`
    if ((totalFiles > maxDocuments) || (totalFilesSize >= maxTotalFileSize)) {
      alert(errormessage45)
      return true
    }

  }

  const getFilesSize = (files) => {
    console.log('getFilesSize')
    let totalSize = 0
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileSize = file.size
      const fileSizeMB = fileSize / 1024 / 1024
      totalSize += fileSizeMB
    }
    return totalSize
  }

  // useEffect(() => {
  //   dispatch(removeQuiz({}))
  //   return () => {
  //   }
  // },[dispatch])

  // useEffect(() => {
  //   if (fileList.length === 0) {
  //     changeHeightFunc(false)
  //   }
  // }, [fileList.length])

  const handleClick = async () => {
    console.log('handleClick')
    navigate('/allbots')
  }

  return (
    <div className="w-full max-w-[520px] rounded-2xl p-3 md:p-5 z-10 backdrop-blur-[34px] bg-white/40 shadow-md md:shadow-xl">
      <TextInputGray
        className={' w-full '}
        value={name}
        placeholder={'This will be the folder name of s3'}
        label={'dev test Name a s3 folder'}
        id={'folder-name'}
        onChange={fileNameonChange}
        required={true}
      />
      <div
        // eslint-disable-next-line quotes
        className={`w-full relative duration-500 group h-56 sm:h-[350px] bg-white/30 flex justify-center items-center flex-col cursor-pointer mb-5 rounded-lg`}
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <ImageTag src={FileIcon} />
        <p className="text-center text-2xl font-bold text-[#3C38CD] opacity-50">
          Upload your content. <br></br>
          (.docx, .pdf, .txt)
        </p>
        <HiddenInput onChange={onFileDrop} acceptFileTypes=".txt,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf" multiple />
        <div
          ref={overlayRef}
          className="w-full h-full absolute group-hover:opacity-5 bg-black opacity-0 transition-all duration-300"
        ></div>
      </div>

      {
        fileList.map((item, key) => {
          console.log('pritesh')
          return <FileBar key={key} file={item} removeFile={fileRemove} setDisabled={setDisabledCreatequiz} folderName={name} finalSubmit={finalSubmit} />
        })
      }
      <pre id="json" className='text-xs'>{apiData}</pre>

      <div className="flex flex-col gap-y-4 justify-between px-0 my-8 w-full mx-auto  ">
        <div className="flex flex-row gap-14 justify-center w-full">
          <GeneralButton
            // eslint-disable-next-line quotes
            id='create_quiz_button'
            className={`h-11 rounded-md w-full text-white text-xl flex justify-center items-center ${disabledCreatequiz ? 'bg-app-grey cursor-not-allowed' : 'bg-app-primary cursor-pointer'}`}
            content={disabledCreatequiz ? 'Uploading.. ' : buttonName}
            onClick={disabledCreatequiz ? null : handleSubmit}
            disabled={disabledCreatequiz}
          />

        </div>

      </div>
      <GeneralButton
        // eslint-disable-next-line quotes
        id='create_quiz_button'
        content="bot dashboard"
        className={` hidden h-11 rounded-md w-64 text-white text-xl justify-center items-center bg-green-400 cursor-pointer`}
        onClick={handleClick}
      />
    </div>
  )
}
