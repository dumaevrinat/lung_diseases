import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import {Button, fade, makeStyles} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(0, 0, 0.5, 0),
    },
    button: {
        padding: theme.spacing(1),
        width: '100%',
    },
    label: {
        padding: theme.spacing(0, 1),
        display: 'flex',
        justifyContent: 'start',
        textTransform: 'none',
    },
    selected: {
        backgroundColor: fade(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    },
}))

const DrawerItem = ({text, icon, isSelected, onClick}) => {
    const classes = useStyles()

    return (
        <ListItem
            className={classes.root}
            onClick={onClick}
        >
            <Button
                classes={{
                    root: clsx(classes.button, isSelected && classes.selected),
                    label: classes.label,
                }}
                size='large'
                color={isSelected ? 'primary' : 'default'}
                startIcon={icon}
            >
                {text}
            </Button>
        </ListItem>
    )
}

export default DrawerItem
