export const readFiles = (files) => {
    return Promise.all(files.map(file => {
        return new Promise(((resolve, reject) => {
            const reader = new FileReader()

            reader.onloadend = (ev) => {
                resolve(ev.target.result)
            }

            reader.onerror = reject

            reader.readAsDataURL(file)
        }))
    }))
}
