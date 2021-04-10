import {
    ADD_FILES, DELETE_ALL_FILE,
    DELETE_FILE,
    UPDATE_FILE,
} from '../actions/types'

const initialState = {
    files: [
        // {
        //     id: nanoid(),
        //     file: file,
        //     status: 'idle' 'loading' 'succeeded' 'failed',
        //     uploadProgress: 0,
        //     probability: [],
        // },
    ],
    labels: [
        'Covid-19',
        'Normal',
        'Pneumonia',
    ],
}

export const xrays = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILES:
            return {
                ...state,
                files: [
                    ...action.payload,
                    ...state.files,
                ],
            }

        case DELETE_FILE:
            return {
                ...state,
                files: state.files.filter(file => file.id !== action.payload),
            }

        case DELETE_ALL_FILE:
            return {
                ...state,
                files: []
            }

        case UPDATE_FILE:
            return {
                ...state,
                files: state.files.map(
                    file => file.id === action.payload.id ?
                        {...file, ...action.payload} : file,
                ),
            }

        default:
            return state
    }
}