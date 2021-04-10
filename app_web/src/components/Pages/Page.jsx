import React, {useContext, useEffect} from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import Fade from '@material-ui/core/Fade'
import UIContext from '../../context'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'stretch',
        width: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(2, 0),
    },
}))

export default function Page({children}) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Fade in>
                {children}
            </Fade>
        </div>
    )
}