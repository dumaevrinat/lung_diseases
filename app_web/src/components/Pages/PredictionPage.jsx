import React, { useContext } from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import Upload from '../Upload'
import { useDispatch, useSelector } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import PredictionCard from '../PredictionCard'
import UIContext from '../../context'
import {
    addFiles,
    deleteAllFiles,
    uploadFilesByStatus,
} from '../../actions/xrays'
import { Add, DeleteOutline, SaveAlt } from '@material-ui/icons'
import { CSVLink } from 'react-csv'
import Fab from '@material-ui/core/Fab'
import HideOnScroll from '../HideOnScroll'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    actions: {
        display: 'flex',
        marginBottom: theme.spacing(4),
        '& > :not(:last-child)': {
            marginRight: theme.spacing(2),
        },
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: theme.zIndex.appBar,
    },
    fabIcon: {
        marginRight: theme.spacing(1),
    },
    noFilesAlert: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        flexGrow: 1,
        marginTop: theme.spacing(4),
    },
    marginBottom: {
        marginBottom: theme.spacing(3),
    },
}))

const PredictionPage = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const files = useSelector(state => state.xrays.files)
    const { isMobile } = useContext(UIContext)

    const handleDeleteAll = () => {
        dispatch(deleteAllFiles())
    }

    const handleAttachFiles = async (e) => {
        if (e.target.files) {
            const filesObj = Array.from(e.target.files)

            await dispatch(addFiles(filesObj))
            await dispatch(uploadFilesByStatus('idle'))
        }
    }

    return (
        <div className={classes.root}>
            {files.length === 0 ?
                <div className={classes.noFilesAlert}>
                    <Typography variant='h6' className={classes.marginBottom}>
                        Upload x-ray to get started
                    </Typography>

                    <Typography align='center' className={classes.marginBottom}>
                        Start uploading chest X-rays and getting
                        predictions. <br />
                        Files you upload will show up here.
                    </Typography>
                    <Upload
                        onChange={handleAttachFiles}
                        children={
                            <Button
                                startIcon={<Add />}
                                variant='contained'
                                disableElevation
                                color='primary'
                                component='span'
                            >
                                Upload
                            </Button>
                        }
                    />
                </div>
                :
                <div>
                    <div className={classes.actions}>
                        {!isMobile &&
                            <Upload
                                onChange={handleAttachFiles}
                                children={
                                    <Button
                                        startIcon={<Add />}
                                        variant='contained'
                                        disableElevation
                                        color='primary'
                                        component='span'
                                    >
                                        Upload
                                    </Button>
                                }
                            />
                        }
                        <Button
                            startIcon={<DeleteOutline />}
                            disableElevation
                            variant='contained'
                            onClick={handleDeleteAll}
                        >
                            Delete all
                        </Button>
                        <CSVLink
                            style={{ textDecoration: 'none', color: 'inherit' }}
                            data={files.map((file) => ({
                                fileName: file.fileName,
                                ...file.probability,
                            }))}
                            filename={'predictions.csv'}
                        >
                            <Button
                                startIcon={<SaveAlt />}
                                variant='contained'
                                disableElevation
                            >
                                Export to CSV
                            </Button>
                        </CSVLink>
                    </div>
                    <Grid container spacing={4}>
                        {files.map(file =>
                            <Grid
                                direction='column'
                                container
                                key={file.id}
                                item
                                xs={12} sm={6} md={4} lg={3}
                            >
                                <PredictionCard file={file} />
                            </Grid>
                        )}
                    </Grid>
                </div>
            }
            {isMobile && files.length !== 0 &&
                <Upload
                    onChange={handleAttachFiles}
                    children={
                        <HideOnScroll>
                            <Fab
                                variant='extended'
                                color='primary'
                                component='span'
                                className={classes.fab}
                            >
                                <Add className={classes.fabIcon} />
                                Upload
                            </Fab>
                        </HideOnScroll>
                    }
                />
            }
        </div>
    )
}

export default PredictionPage
