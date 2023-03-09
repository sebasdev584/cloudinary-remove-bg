import { useContext } from 'react'
import CloudinaryIcon from './components/icons/Cloudinary'
import { StepEdit } from './components/ui/StepEdit'
import { StepUpload } from './components/ui/StepUpload'
import { ImageContext } from './context/ImageContext'
import { IMAGE_STATUS } from './helpers/helper'

function App() {
  const { imageStatus } = useContext(ImageContext)
  return (
    <div className="max-w-xl m-auto grid grid-cols-1 place-content-center w-full h-screen">
      <header className='flex justify-center py-10'>
        <h1 className='text-3xl font-bold text-blue-900 tracking-tighter'>Remove<span className='text-blue-600'>bg</span></h1>
      </header>

      <main>
        {(imageStatus === IMAGE_STATUS.READY || imageStatus === IMAGE_STATUS.UPLOADING) ?
          <StepUpload />
          :
          <StepEdit />
        }
      </main>

      <footer className='flex justify-center items-center gap-x-2 font-semibold pt-10'>
        Hecho con <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer"><CloudinaryIcon width={250} /></a>
      </footer>
    </div>
  )
}

export default App
