import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from './types'

export const enqueueSnackbar = (notification) => {
    const key = notification.options && notification.options.key

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        }
    }
}

export const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key,
    key,
})

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
})
