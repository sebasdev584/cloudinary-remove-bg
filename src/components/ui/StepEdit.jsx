import { useContext, useEffect, useState } from "react"
import { ImageContext } from "../../context/ImageContext"
import "two-up-element"


export const StepEdit = () => {
    const { originalImage, modifiedImage } = useContext(ImageContext)
    const [processingImage, setProcessingImage] = useState(true)

    let tries = 0
    let intervalId = 0

    useEffect(() => {
        if (processingImage) {
            clearInterval(intervalId)
            intervalId = setInterval(() => {
                tries++
                let img = new Image()
                img.src = modifiedImage
                img.onload = () => {
                    setProcessingImage(false)
                    clearInterval(intervalId)
                }
            }, 500);
        }
    }, [])

    return (
        <>
            <two-up>
                <img src={originalImage.secure_url} alt="Imagen original subida por el usuario" />
                {(processingImage) ?
                    <div>Cargando imagen</div>
                    :
                    <img src={modifiedImage} alt="Imagen sin fondo" />
                }
            </two-up>

            <a
                download
                href={modifiedImage}
                className='block bg-blue-500 hover:bg-blue-700 rounded-lg mt-5 text-center text-white p-5'
            >
                Descargar imagen sin fondo
            </a>
        </>
    )
}
