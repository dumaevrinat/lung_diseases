import React, {memo, useState} from 'react'
import {makeStyles} from '@material-ui/core'
import {useSelector} from 'react-redux'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'
import Tooltip from '@material-ui/core/Tooltip'
import StatisticsPopper from './StatisticsPopper'
import ImageCard from './ImageCard'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    footer: {
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

const PredictionCard = ({file}) => {
    const classes = useStyles()
    const labels = useSelector(state => state.xrays.labels)
    const [popperAnchorEl, setPopperAnchorEl] = useState(null)

    const handleClickChip = (event) => {
        setPopperAnchorEl(popperAnchorEl ? null : event.currentTarget)
    }

    const handleClickAwayPopper = () => {
        setPopperAnchorEl(null)
    }

    return (
        <div className={classes.root}>
            <ImageCard fileUrl={file.fileUrl}/>

            <div className={classes.footer}>
                <Tooltip interactive placement="top" title={file.fileName}>
                    <Box
                        className={classes.title}
                        fontWeight="fontWeightMedium"
                        fontFamily="fontFamily"
                    >
                        {file.fileName}
                    </Box>
                </Tooltip>
                <div>
                    {file.status === 'loading' && <CircularProgress color="secondary" size={28} thickness={4.0}/>}
                    {file.status === 'succeeded' &&
                    <Chip
                        color="secondary"
                        variant="outlined"
                        clickable
                        onClick={handleClickChip}
                        label={labels[file.probability.indexOf(Math.max(...file.probability))]}
                    />
                    }
                </div>
            </div>
            {Boolean(popperAnchorEl) &&
            <StatisticsPopper
                isOpen={Boolean(popperAnchorEl)}
                anchorEl={popperAnchorEl}
                onClickAway={handleClickAwayPopper}
                data={file.probability.map((probability, i) => ({
                    label: labels[i],
                    value: probability,
                }))}
            />
            }
        </div>
    )
}

export default memo(PredictionCard)
