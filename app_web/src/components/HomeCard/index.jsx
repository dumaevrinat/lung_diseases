import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import { Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.spacing(2),
        height: '100%',
        width: '100%',
    },
    title: {
        padding: theme.spacing(2),
    },
}))


const HomeCard = ({ title, children }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant='outlined'>
            <Typography variant='h6' className={classes.title}>
                {title}
            </Typography>
            {children}
        </Card>
    )
}

export default HomeCard

