import React from 'react'
import { CardContent, makeStyles, Typography } from '@material-ui/core'
import PredictionChart from '../PredictionChart'
import Grid from '@material-ui/core/Grid'
import CarouselCard from '../CarouselCard'
import PredictionLog from '../PredictionLog'
import { useSelector } from 'react-redux'
import HomeCard from '../HomeCard'
import CarouselCardItem from '../CarouselCard/CarouselCardItem'
import ActionCard from '../ActionCard'
import { useHistory } from 'react-router-dom'
import { GrainRounded } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
    },
    chartCardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
    },
    logCardContent: {
        overflowX: 'auto',
    },
    statisticCardContent: {
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: 0,
        '& > :not(:last-child)': {
            marginRight: theme.spacing(1),
        },
    },
}))

const HomePage = () => {
    const classes = useStyles()
    const history = useHistory()

    const files = useSelector(state => state.xrays.files)
    const averagePredictionTime = useSelector(state => state.xrays.files
        .map(file => file.dateOfCompletePrediction - file.dateOfStartPrediction)
        .filter(timeDifference => !Number.isNaN(timeDifference))
        .reduce((result, timeDifference, index, array) => {
            result += timeDifference

            if (index === array.length - 1) {
                result /= array.length
            }

            return result
        }, 0)
    )

    const goToPage = (path) => {
        history.push(`${path}`)
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3} alignItems='stretch'>
                <Grid item alignItems='stretch' container spacing={3} md={3}>
                    <Grid item xs={12} sm={4} md={12}>
                        <ActionCard
                            title='Predict'
                            image='images/xray.jpeg'
                            icon={<GrainRounded />}
                            onClick={() => goToPage('/prediction')}
                        />
                    </Grid>

                    <Grid item xs={6} sm={4} md={12}>
                        <HomeCard title='Total X-Ray'>
                            <CardContent className={classes.statisticCardContent}>
                                <Typography color='secondary' variant='h5'>
                                    {files.length}
                                </Typography>
                                <Typography color='secondary'>
                                    images
                                </Typography>
                            </CardContent>
                        </HomeCard>
                    </Grid>
                    <Grid item xs={6} sm={4} md={12}>
                        <HomeCard title='Average prediction time'>
                            <CardContent className={classes.statisticCardContent}>
                                <Typography color='secondary' variant='h5'>
                                    {(averagePredictionTime / (1000 * 60)).toFixed(2)}
                                </Typography>
                                <Typography color='secondary'>
                                    minutes
                                </Typography>
                            </CardContent>
                        </HomeCard>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} md>
                    <HomeCard title='Prediction statistics'>
                        <CardContent className={classes.chartCardContent}>
                            <PredictionChart />
                        </CardContent>
                    </HomeCard>
                </Grid>

                <Grid item xs={12} sm={6} md>
                    <CarouselCard items={[
                        <CarouselCardItem title='Covid-19'>
                            <Typography>
                                Coronavirus disease (COVID-19) is an infectious disease caused by a newly discovered
                                coronavirus.
                                <br />
                                <br />
                                Most people infected with the COVID-19 virus will experience mild to moderate
                                respiratory
                                illness and recover without requiring special treatment. Older people, and those
                                with
                                underlying medical problems like cardiovascular disease, diabetes, chronic
                                respiratory
                                disease, and cancer are more likely to develop serious illness.
                            </Typography>
                        </CarouselCardItem>,
                        <CarouselCardItem title='Pneumonia'>
                            <Typography>
                                Pneumonia is an inflammatory condition of the lung primarily affecting the small air
                                sacs known as alveoli.
                                Symptoms typically include some combination of productive or dry cough, chest pain,
                                fever and difficulty
                                breathing. The severity of the condition is variable.
                                <br />
                                <br />
                                Pneumonia is usually caused by infection with viruses or bacteria, and less commonly
                                by other microorganisms. Identifying the responsible pathogen can be difficult.
                                Diagnosis is often based on symptoms and physical examination. Chest X-rays,
                                blood tests, and culture of the sputum may help confirm the diagnosis. The disease
                                may be classified by where it was acquired, such as community- or hospital-acquired
                                or healthcare-associated pneumonia.
                            </Typography>
                        </CarouselCardItem>
                    ]} />
                </Grid>

                <Grid item xs={12}>
                    <HomeCard title='Prediction log'>
                        <CardContent className={classes.logCardContent}>
                            <PredictionLog />
                        </CardContent>
                    </HomeCard>
                </Grid>
            </Grid>
        </div>
    )
}

export default HomePage
