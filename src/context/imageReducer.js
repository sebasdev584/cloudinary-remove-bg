

export default function imageReducer(state, action) {
    switch (action.type) {
        case '[Image] - add original image':
            return {
                ...state,
                originalImage: action.payload
            }

        case '[Image] update image status':
            return {
                ...state,
                imageStatus: action.payload
            }

        case '[Image] - add modified image':
            return {
                ...state,
                modifiedImage: action.payload
            }

        default:
            return state
    }
}