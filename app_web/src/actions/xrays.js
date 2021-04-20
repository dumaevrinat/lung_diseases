import {UPDATE_FILE, DELETE_FILE, DELETE_ALL_FILE, ADD_FILE} from './types'
import {readFile} from '../utils/upload'
import {nanoid} from 'nanoid'
import {enqueueSnackbar} from './notifications'
import {predict} from '../api'

export const uploadFilesByStatus = (status) => async (dispatch, getState) => {
    const files = getState().xrays.files.filter(file => file.status === status)

    await files.forEach(file => {
        dispatch(uploadFile(file))
    })
}

export const uploadFile = (file) => async (dispatch) => {
    dispatch(updateFile({
        id: file.id,
        status: 'loading',
    }))

    predict(file.fileObj).then(result => {
        if (result.data) {
            dispatch(updateFile({
                id: file.id,
                status: 'succeeded',
                probability: result.data.probability,
            }))
        } else {
            dispatch(updateFile({
                id: file.id,
                status: 'failed',
            }))

            dispatch(enqueueSnackbar({message: 'Upload file error'}))
        }
    }).catch(error => {
        dispatch(updateFile({
            id: file.id,
            status: 'failed',
        }))

        dispatch(enqueueSnackbar({message: 'Upload file error'}))
    })
}

export const addFiles = (filesObj) => async (dispatch) => {
    await Promise.all(filesObj.map((fileObj) => new Promise((resolve, reject) => {
        readFile(fileObj)
            .then((fileRead) => {
                dispatch(addFile(fileRead, fileObj))
                resolve(fileRead)
            })
            .catch((error) => {
                dispatch(enqueueSnackbar({message: error}))
                reject(error)
            })
    })))
}

export const addFile = (fileRead, fileObj) => (dispatch) => {
    const file = {
        id: nanoid(),
        fileData: fileRead,
        fileName: fileObj.name,
        fileObj: fileObj,
        status: 'idle',
        uploadProgress: 0,
        probability: [],
    }

    dispatch({
        type: ADD_FILE,
        payload: file,
    })
}

export const updateFile = (fileProps) => ({
    type: UPDATE_FILE,
    payload: fileProps,
})

export const deleteFile = (id) => ({
    type: DELETE_FILE,
    payload: id,
})

export const deleteAllFiles = () => ({
    type: DELETE_ALL_FILE,
})

