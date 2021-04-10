import {ADD_FILES, UPDATE_FILE, DELETE_FILE, DELETE_ALL_FILE} from './types'
import {readFiles} from '../utils/upload'
import {nanoid} from 'nanoid'
import {enqueueSnackbar} from './notifications'
import {predict} from '../api'

export const uploadFiles = () => async (dispatch, getState) => {
    const files = getState().xrays.files.filter(file => file.status === 'idle')

    files.forEach(file => {
        dispatch(updateFile({...file, status: 'loading'}))

        predict(file.file, () => {})
        .then(result => {
            if (result.data) {
                dispatch(updateFile({
                    ...file,
                    status: 'succeeded',
                    probability: result.data.probability,
                }))
            } else {
                dispatch(updateFile({
                    ...file,
                    status: 'failed',
                }))
                dispatch(enqueueSnackbar({message: 'Upload file error'}))
            }
        }).catch(error => {
            dispatch(updateFile({
                ...file,
                status: 'failed',
            }))
            dispatch(enqueueSnackbar({message: 'Upload file error'}))
        })
    })
}

export const addFiles = (files) => async (dispatch) => {
    await readFiles(files).then(readFiles => {
        files = readFiles.map((fileData, i) => ({
            id: nanoid(),
            fileData: fileData,
            fileName: files[i].name,
            file: files[i],
            status: 'idle',
            uploadProgress: 0,
            probability: [],
        }))

        dispatch({
            type: ADD_FILES,
            payload: files,
        })
    }).catch(error => {
        dispatch(enqueueSnackbar({
            message: error,
        }))
    })
}

export const updateFile = (file) => ({
    type: UPDATE_FILE,
    payload: file,
})

export const deleteFile = (id) => ({
    type: DELETE_FILE,
    payload: id,
})

export const deleteAllFiles = () => ({
    type: DELETE_ALL_FILE,
})

