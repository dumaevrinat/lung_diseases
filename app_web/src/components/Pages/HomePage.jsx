import React from 'react'
import {
    CardContent,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import PredictionChart from '../PredictionChart'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import {ArrowBack, ArrowForward} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.spacing(2),
        height: '100%',
        width: '100%',
    },
    chartCardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box'
    },
    chart: {
    },
    cardTitle: {
        marginBottom: theme.spacing(2)
    }
}))

const HomePage = () => {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Grid container spacing={4} alignContent='stretch'>
                <Grid
                    direction="column" container item
                    xs={12} sm={6} md={6} lg={4}
                >
                    <Card className={classes.card}>
                        <CardContent className={classes.chartCardContent}>
                                <PredictionChart/>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid
                    direction="column" container item
                    xs={12} sm={6} md={6} lg={4}
                >
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography variant='h6' className={classes.cardTitle}>
                                Covid-19
                            </Typography>
                            <Typography>
                                erfferferrfefeerer <br/>
                                erfferferrfefeerer <br/>
                                erfferferrfefeerer <br/>
                                erfferferrfefeerer <br/>
                                erfferferrfefeerer <br/>
                                erfferferrfefeerer <br/>
                                erfferferrfefeerer <br/>
                                erfferferrfefeerer <br/>
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton>
                                <ArrowBack/>
                            </IconButton>
                            <IconButton>
                                <ArrowForward/>
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomePage