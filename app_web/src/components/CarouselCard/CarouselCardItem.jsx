import {makeStyles} from '@material-ui/styles'
import {CardContent, Typography} from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {},
    title: {
        padding: theme.spacing(2),
    }
}))

const CarouselCardItem = ({title, children}) => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Typography variant='h6' className={classes.title}>
                {title}
            </Typography>
            <CardContent>
                {children}
            </CardContent>
        </div>
    )
}

export default CarouselCardItem
