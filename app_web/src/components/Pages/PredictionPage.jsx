import React, {useContext, useEffect} from 'react'
import {Button, makeStyles, Typography} from '@material-ui/core'
import Upload from '../Upload'
import {useDispatch, useSelector} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import PredictionCard from '../PredictionCard'
import UIContext from '../../context'
import {deleteAllFiles} from '../../actions/xrays'
import {Delete, GetApp} from '@material-ui/icons'
import {CSVLink} from 'react-csv'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    actions: {
        display: 'flex',
        marginBottom: theme.spacing(4),
        '& > *': {
            marginRight: theme.spacing(2),
        },
    },
    noFilesAlert: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        flexGrow: 1,
        marginTop: theme.spacing(4)
    },
    marginBottom: {
        marginBottom: theme.spacing(3)
    }
}))

export default function PredictionPage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const files = useSelector(state => state.xrays.files)
    const {setTitle} = useContext(UIContext)

    useEffect(() => {
        setTitle('Disease prediction')
    }, [])

    const handleDeleteAll = () => {
        dispatch(deleteAllFiles())
    }

    return (
        <div className={classes.root}>

            {files.length === 0 ?
                <div className={classes.noFilesAlert}>
                    <Typography variant='h6' className={classes.marginBottom}>
                        Upload x-ray to get started
                    </Typography>

                    <Typography align='center' className={classes.marginBottom}>
                        Start uploading chest X-rays and getting predictions. <br/>
                        Files you upload will show up here.
                    </Typography>
                    <Upload/>
                </div>
                :
                <div>
                    <div className={classes.actions}>
                        <Upload/>
                        <Button
                            startIcon={<Delete/>}
                            disableElevation
                            variant='contained'
                            onClick={handleDeleteAll}
                        >
                            Delete all
                        </Button>
                        <CSVLink
                            style={{textDecoration: 'none', color: 'inherit'}}
                            data={files.map((file) => ({
                                fileName: file.fileName,
                                ...file.probability
                            }))}
                            filename={"predictions.csv"}
                        >
                            <Button
                                startIcon={<GetApp/>}
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
                                direction="column"
                                container
                                key={file.id}
                                item
                                xs={12} sm={6} md={4} lg={3}
                            >
                                <PredictionCard file={file}/>
                            </Grid>,
                        )}
                    </Grid>
                </div>
            }
        </div>
    )
}