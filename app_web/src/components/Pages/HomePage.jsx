import React, {useContext, useEffect} from 'react'
import {Button, CardContent, makeStyles} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import {useDispatch} from 'react-redux'
import {enqueueSnackbar} from '../../actions/notifications'
import UIContext from '../../context'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    card: {
        borderRadius: theme.spacing(1),

    },
}))

export default function HomePage() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {setTitle} = useContext(UIContext)

    useEffect(() => {
        setTitle('Home')
    }, [])

    const handleClick = () => {
        dispatch(enqueueSnackbar({
            message: 'ffff',
        }))
    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <CardContent>
                    rgrtgtrgrt tgtr gtr grtg rt grt grtg rt rt tr rt
                    <br/> gtrgrtgtrg rttrtrtr rgtgrt
                </CardContent>
            </Card>
            <Button onClick={handleClick}>
                notification
            </Button>
        </div>
    )
}