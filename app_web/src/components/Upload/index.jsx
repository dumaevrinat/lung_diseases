import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
    },
    input: {
        display: 'none'
    },
}))

const Upload = ({onChange, children}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                formEncType='multipart/form-data'
                onChange={onChange}
            />
            <label htmlFor="contained-button-file">
                {children}
            </label>
        </div>
    )
}

export default Upload