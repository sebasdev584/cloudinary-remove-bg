import { useReducer } from "react";
import { IMAGE_STATUS } from "../helpers/helper";
import { ImageContext } from "./ImageContext";
import imageReducer from "./imageReducer";

const IMAGE_INITIAL_STATE = {
    imageStatus: IMAGE_STATUS.READY,
    originalImage: '',
    modifiedImage: ''
}

export default function ImageProvider({ children }) {
    const [state, dispatch] = useReducer(imageReducer, IMAGE_INITIAL_STATE)

    const addOriginalImage = (image) => {
        dispatch({ type: '[Image] - add original image', payload: image })
    }

    const addModifiedImage = (url) => {
        dispatch({ type: '[Image] - add modified image', payload: url })
    }

    const setImageStatus = (status) => {
        dispatch({ type: '[Image] update image status', payload: status })
    }

    return (
        <ImageContext.Provider value={{ ...state, addOriginalImage, setImageStatus, addModifiedImage }} >
            {children}
        </ImageContext.Provider>
    )
}