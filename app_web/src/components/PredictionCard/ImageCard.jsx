import {CardActionArea, CardMedia, makeStyles} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        marginBottom: theme.spacing(1),
        borderRadius: theme.spacing(2),
    },
    imageContainer: {
        display: 'block',
        paddingBottom: '100%'
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
}))

const ImageCard = ({fileUrl}) => {
    const classes = useStyles()

    return (
        <Card className={classes.root} elevation={0}>
            <CardActionArea>
                <div className={classes.imageContainer}>
                    <CardMedia
                        className={classes.image}
                        component='img'
                        src={fileUrl}
                    />
                </div>
            </CardActionArea>
        </Card>
    )
}

export default ImageCard
