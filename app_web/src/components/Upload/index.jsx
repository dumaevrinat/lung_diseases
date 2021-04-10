import React from 'react'
import {makeStyles} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import {useDispatch} from 'react-redux'
import {uploadFiles, addFiles} from '../../actions/xrays'
import {Publish} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    input: {
        display: 'none'
    },
}))


export default function Upload() {
    const classes = useStyles()
    const dispatch = useDispatch()

    const handleAttachFiles = async (e) => {
        if (e.target.files) {
            const files = Array.from(e.target.files)

            await dispatch(addFiles(files))
            await dispatch(uploadFiles())
        }
    }

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                formEncType='multipart/form-data'
                onChange={handleAttachFiles}
            />
            <label htmlFor="contained-button-file">
                <Button
                    startIcon={<Publish/>}
                    variant="contained"
                    disableElevation
                    color="primary"
                    component="span"
                >
                    Upload
                </Button>
            </label>
        </div>
    )
}