import { makeStyles } from '@material-ui/styles'
import { Button, Card, CardContent } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        minHeight: theme.spacing(18),
        display: 'flex',
        alignItems: 'flex-end',
        borderRadius: theme.spacing(2),
        backgroundImage: props => `url(${props.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },
    content: {
        padding: theme.spacing(3)
    }
}))

const ActionCard = ({ title, image, icon, onClick }) => {
    const classes = useStyles({ image })

    return (
        <Card variant='outlined' className={classes.root}>
            <CardContent className={classes.content}>
                <Button
                    variant='contained'
                    disableElevation
                    color='primary'
                    startIcon={icon}
                    onClick={onClick}
                >
                    {title}
                </Button>
            </CardContent>
        </Card>
    )
}

export default ActionCard
