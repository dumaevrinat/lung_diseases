import {makeStyles} from '@material-ui/styles'
import {useSelector} from 'react-redux'
import {Avatar, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import React from 'react'
import Chip from '@material-ui/core/Chip'
import {Skeleton} from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
    },
    tableCell: {
        borderBottom: 'none',
    },
    emptyLog: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

}))

const EmptyLog = () => {
    return (
        <Table size='small'>
            <TableHead>
                <TableRow>
                    <StyledTableCell>Image</StyledTableCell>
                    <StyledTableCell align='left'>File name</StyledTableCell>
                    <StyledTableCell align='left'>Start prediction date</StyledTableCell>
                    <StyledTableCell align='left'>Complete prediction date</StyledTableCell>
                    <StyledTableCell align='left'>Prediction result</StyledTableCell>
                    <StyledTableCell align='left'>Probability</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Array.from(Array(5)).map((_, index) => (
                    <TableRow key={index}>
                        <StyledTableCell><Skeleton variant='circle' width={40} height={40} animation={false}/></StyledTableCell>
                        <StyledTableCell align='left'><Skeleton animation={false}/></StyledTableCell>
                        <StyledTableCell align='left'><Skeleton animation={false}/></StyledTableCell>
                        <StyledTableCell align='left'><Skeleton animation={false}/></StyledTableCell>
                        <StyledTableCell align='left'><Skeleton animation={false}/></StyledTableCell>
                        <StyledTableCell align='left'><Skeleton animation={false}/></StyledTableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

const StyledTableCell = ({children, ...props}) => {
    const classes = useStyles()

    return (
        <TableCell className={classes.tableCell} {...props}>{children}</TableCell>
    )
}

const PredictionLog = () => {
    const classes = useStyles()

    const labels = useSelector(state => state.xrays.labels)
    const files = useSelector(state => state.xrays.files)

    const dateOptions = {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }

    return (
        <div className={classes.root}>
            {files.length === 0 && <EmptyLog/>}
            {files.length !== 0 &&
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Image</StyledTableCell>
                        <StyledTableCell align='left'>File name</StyledTableCell>
                        <StyledTableCell align='left'>Start prediction date</StyledTableCell>
                        <StyledTableCell align='left'>Complete prediction date</StyledTableCell>
                        <StyledTableCell align='left'>Prediction result</StyledTableCell>
                        <StyledTableCell align='left'>Probability</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files.map((file) => (
                        <TableRow key={file.id}>
                            <StyledTableCell>
                                <Avatar alt={file.fileName} src={file.fileUrl}/>
                            </StyledTableCell>

                            <StyledTableCell align='left' component='th' scope='row'>
                                {file.fileName}
                            </StyledTableCell>

                            <StyledTableCell align='left'>
                                {file.dateOfStartPrediction &&
                                file.dateOfStartPrediction.toLocaleString('en-US', dateOptions)
                                }
                            </StyledTableCell>

                            <StyledTableCell align='left'>
                                {file.dateOfCompletePrediction ?
                                    file.dateOfCompletePrediction.toLocaleString('en-US', dateOptions)
                                    :
                                    <CircularProgress color='secondary' size={28} thickness={4.0}/>
                                }
                            </StyledTableCell>

                            <StyledTableCell align='left'>
                                {file.status === 'succeeded' &&
                                <div>
                                    {labels[file.probability.indexOf(Math.max(...file.probability))]}
                                </div>
                                }
                                {file.status === 'loading' &&
                                <CircularProgress color='secondary' size={28} thickness={4.0}/>
                                }
                            </StyledTableCell>

                            <StyledTableCell align='left'>
                                {file.status === 'succeeded' &&
                                <Chip
                                    color='secondary'
                                    size='small'
                                    variant='outlined'
                                    label={`${(Math.max(...file.probability) * 100).toFixed(1)}%`}
                                />
                                }
                                {file.status === 'loading' &&
                                <CircularProgress color='secondary' size={28} thickness={4.0}/>
                                }
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            }
        </div>
    )
}

export default PredictionLog