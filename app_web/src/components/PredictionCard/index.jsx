import React from 'react'
import {
    Button,
    CardActionArea,
    CardMedia,
    makeStyles,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import {useSelector} from 'react-redux'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    card: {
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
    },
    cardFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        marginRight: theme.spacing(1),
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
}))

export default function PredictionCard({file}) {
    const classes = useStyles()
    const labels = useSelector(state => state.xrays.labels)

    return (
        <div className={classes.root}>
            <Card className={classes.card} elevation={0}>
                <CardActionArea>
                    <div className={classes.imageContainer}>
                        <CardMedia
                            className={classes.image}
                            component='img'
                            image={file.fileData}
                        />
                    </div>
                </CardActionArea>
            </Card>
            <div className={classes.cardFooter}>
                <Tooltip interactive placement='top' title={file.fileName}>
                        <Box
                            className={classes.title}
                            fontWeight='fontWeightMedium'
                            fontFamily='fontFamily'
                        >
                            {file.fileName}
                        </Box>
                </Tooltip>
                <div>
                    {file.status === 'loading' && <CircularProgress color='secondary' size={20} thickness={4.5}/>}
                    {file.status === 'succeeded' &&
                    <Chip
                        color='secondary'
                        variant='outlined'
                        size='small'
                        clickable
                        label={labels[file.probability.indexOf(Math.max(...file.probability))]}
                    />
                    }
                </div>
            </div>
        </div>
    )
}