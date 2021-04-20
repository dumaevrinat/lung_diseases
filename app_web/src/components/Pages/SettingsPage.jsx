import React from 'react'
import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
}))

const SettingsPage = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>

        </div>
    )
}

export default SettingsPage