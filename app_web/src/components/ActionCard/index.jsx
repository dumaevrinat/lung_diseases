import {makeStyles} from '@material-ui/styles'
import {Button} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        width: '100%',
        minHeight: theme.spacing(8),
        display: 'flex',
        borderRadius: theme.spacing(2),
    },
    label: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(1),
        textTransform: 'none',
    },
    startIcon: {
        margin: 0,
        marginBottom: theme.spacing(1)
    }
}))

const ActionCard = ({title, icon, onClick}) => {
    const classes = useStyles()

    return (
        <Button
            variant='contained'
            disableElevation
            classes={{
                root: classes.root,
                label: classes.label,
                startIcon: classes.startIcon
            }}
            onClick={onClick}
            size='large'
            color='primary'
            startIcon={icon}
        >
            {title}
        </Button>
    )
}

export default ActionCard
