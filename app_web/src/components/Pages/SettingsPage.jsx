import React, {useContext, useEffect} from 'react'
import {makeStyles} from '@material-ui/core'
import UIContext from '../../context'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
}))

export default function SettingsPage() {
    const classes = useStyles()
    const {setTitle} = useContext(UIContext)

    useEffect(() => {
        setTitle('Settings')
    }, [])


    return (
        <div className={classes.root}>

        </div>
    )
}