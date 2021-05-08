import React, {useContext} from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import AppBar from '@material-ui/core/AppBar'
import {Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import UIContext from '../../context'
import {useLocation} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: theme.spacing(4, 0),
        marginBottom: theme.spacing(2)
    },
    menuButton: {
        marginRight: theme.spacing(2),
        borderRadius: theme.spacing(1),
    },
    title: {
        flexGrow: 1,
    },
}))

const titleByPath = {
    '/': 'Home',
    '/prediction': 'Disease prediction',
    '/settings': 'Settings'
}

const Header = () => {
    const classes = useStyles()
    const location = useLocation()

    const {isMobile, isOpenDrawer, setIsOpenDrawer} = useContext(UIContext)

    return (
        <AppBar
            className={classes.root}
            position='relative'
            elevation={0}
            color='transparent'
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
                {titleByPath[location.pathname]}
            </Typography>
        </AppBar>
    )
}

export default Header
