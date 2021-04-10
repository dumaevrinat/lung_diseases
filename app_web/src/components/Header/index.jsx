import React, {useContext} from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import {Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import UIContext from '../../context'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(2, 2)
    },
    desktop: {
        padding: theme.spacing(4, 2, 2, 2)
    },
    menuButton: {
        marginRight: theme.spacing(2),
        borderRadius: theme.spacing(1)
    },
    title: {
        flexGrow: 1
    }
}))

export default function Header({title, children}) {
    const classes = useStyles()

    const {isMobile, isOpenDrawer, setIsOpenDrawer} = useContext(UIContext)

    return (
        <AppBar
            className={clsx(classes.root, !isMobile && classes.desktop)}
            position='relative'
            elevation={0}
            color='white'
        >
                {isMobile &&
                <IconButton
                    className={classes.menuButton}
                    onClick={() => setIsOpenDrawer(!isOpenDrawer)}
                    color='inherit'
                >
                    <MenuIcon/>
                </IconButton>
                }
                <Typography
                    className={classes.title}
                    variant={isMobile ? 'h5' : 'h4'}
                    noWrap
                >
                    {title}
                </Typography>
                {children}
        </AppBar>
    )
}