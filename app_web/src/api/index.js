import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL

export const predict = (file, onUploadProgress) => {
    const formData = new FormData()
    formData.append('file', file)

    return axios({
        method: 'post',
        url: '/predict',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData,
        onUploadProgress: onUploadProgress,
    })
}