import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8000'

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