import { useCallback, useContext } from 'react'
import { Cloudinary } from '@cloudinary/url-gen'
import { backgroundRemoval } from '@cloudinary/url-gen/actions/effect'
import { useDropzone } from 'react-dropzone'
import { ImageContext } from '../../context/ImageContext'
import { IMAGE_STATUS } from '../../helpers/helper'

export const StepUpload = () => {
    const { setImageStatus, addOriginalImage, addModifiedImage } = useContext(ImageContext)

    const cloudinary = new Cloudinary({
        cloud: {
            cloudName: 'duyto1kmc'
        },
        url: {
            secure: true
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.map((fileUpload) => {
            const form = new FormData()
            form.append('file', fileUpload)
            form.append('upload_preset', 'test-app')
            form.append('timestamp', Date.now() / 1000)
            form.append('api_key', '758681921823895')
            fetch('https://api.cloudinary.com/v1_1/duyto1kmc/image/upload', {
                method: 'POST',
                body: form
            }).then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        const { public_id: publicId } = data
                        // const imageWithoutBacground = cloudinary
                        //     .image(publicId)
                        //     .effect(backgroundRemoval())

                        setImageStatus(IMAGE_STATUS.DONE)
                        addOriginalImage(data)
                        // addModifiedImage(imageWithoutBacground.toURL())
                        addModifiedImage('https://res.cloudinary.com/duyto1kmc/image/upload/e_background_removal/ygw1ebznyipfecnik9jn?_a=ATCqVAA0')
                    }
                })
                .catch(err => console.log('Error', err))
        })
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <form {...getRootProps({ className: 'dropzone' })} id="dropzone" className='shadow-2xl border-dashed border-2 border-gray-300 rounded-lg aspect-video w-full flex items-center justify-center flex-col'>
            <input {...getInputProps()} />
            <button className='font-bold pointer-events-none bg-blue-600 rounded-full text-white text-lg px-6 py-4'>
                Upload Files
            </button>
            <strong className='text-lg mt-4 text-gray-800'>or drog a file</strong>
        </form>
    )
}
