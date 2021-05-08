import {
    ADD_FILE,
    DELETE_ALL_FILE,
    DELETE_FILE,
    UPDATE_FILE,
} from '../actions/types'

const initialState = {
    files: [],
    labels: [
        'Covid-19',
        'Normal',
        'Pneumonia',
    ],
}

export const xrays = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILE:
            return {
                ...state,
                files: [
                    action.payload,
                    ...state.files
                ]
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
