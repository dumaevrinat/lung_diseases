import {makeStyles} from '@material-ui/styles'
import {Fade, IconButton} from '@material-ui/core'
import CardActions from '@material-ui/core/CardActions'
import {ArrowBack, ArrowForward} from '@material-ui/icons'
import Card from '@material-ui/core/Card'
import React, {useState} from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.spacing(2),
        height: '100%',
        width: '100%',
    },
    content: {
        height: '100%',
        width: '100%'
    }
}))

const CarouselCard = ({items}) => {
    const classes = useStyles()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [transitionIn, setTransitionIn] = useState(true)

    const handleArrowClick = (direction) => {
        const increment = direction === 'left' ? -1 : 1
        const newIndex = (currentIndex + increment + items.length) % items.length

        setTransitionIn(false)

        setTimeout(() => {
            setCurrentIndex(newIndex)
            setTransitionIn(true)
        }, 200)
    }

    return (
        <Card className={classes.root} variant='outlined'>
            <Fade in={transitionIn} timeout={200}>
                <div className={classes.content}>
                    {items.length !== 0 && items[currentIndex]}
                </div>
            </Fade>
            <CardActions>
                <IconButton onClick={() => handleArrowClick('left')}>
                    <ArrowBack/>
                </IconButton>
                <IconButton onClick={() => handleArrowClick('right')}>
                    <ArrowForward/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CarouselCard
