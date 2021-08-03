import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import Popper from '@material-ui/core/Popper'
import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(2),
        borderRadius: theme.spacing(2),
    },
    row: {},
    cell: {
        paddingRight: theme.spacing(2),
    },
}))

const StatisticsPopper = ({ isOpen, anchorEl, onClickAway, data }) => {
    const classes = useStyles()

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <Popper
                className={classes.root}
                open={isOpen}
                anchorEl={anchorEl}
                placement='top'
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} disableStrictModeCompat>
                        <Paper className={classes.paper}>
                            <table>
                                <tbody>
                                    {data.sort((a, b) => b.value - a.value).map(({ label, value }, i) => (
                                        <tr className={classes.row} key={label}>
                                            <td align='left' className={classes.cell}>
                                                <Typography>
                                                    {label}
                                                </Typography>
                                            </td>
                                            <td align='left'>
                                                <Box fontWeight='fontWeightMedium' fontFamily='fontFamily'>
                                                    {`${(value * 100).toFixed(1)}%`}
                                                </Box>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </ClickAwayListener>
    )
}

export default StatisticsPopper
