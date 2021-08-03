import React from 'react'
import { useScrollTrigger } from '@material-ui/core'
import Slide from '@material-ui/core/Slide'

const HideOnScroll = ({ children, window }) => {
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        threshold: 0,
    })

    return (
        <Slide in={!trigger} direction='up' disableStrictModeCompat>
            {children}
        </Slide>
    )
}

export default HideOnScroll
