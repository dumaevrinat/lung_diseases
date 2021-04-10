import React, {useContext} from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import {useHistory, useLocation} from 'react-router-dom'
import UIContext from '../../context'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import DrawerItem from './DrawerItem'
import {
    GrainRounded, HelpOutlineOutlined, HomeOutlined,
    InfoOutlined, InsertDriveFileOutlined,
    SettingsOutlined
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.mixins.drawer.minWidth,
        padding: theme.spacing(2, 1, 2, 2),
        height: '100%',
        flexShrink: 0,
    },
    paper: {
        padding: theme.spacing(2, 1, 2, 2),
        width: theme.mixins.drawer.minWidth,
    },
    close: {
        width: 0,
    },
    menuTitle: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
        fontWeight: theme.typography.fontWeightMedium
    }
}))

const pages = [
    {
        title: 'Home',
        icon: <HomeOutlined/>,
        path: '/',
    },
    {
        title: 'Disease prediction',
        icon: <GrainRounded/>,
        path: '/prediction'
    },
    {
        title: 'Settings',
        icon: <SettingsOutlined/>,
        path: '/settings'
    }
]

const supportPages = [
    {
        title: 'Docs',
        icon: <InsertDriveFileOutlined/>,
        path: '/docs',
    },
    {
        title: 'Help',
        icon: <HelpOutlineOutlined/>,
        path: '/help',
    },
    {
        title: 'About',
        icon: <InfoOutlined/>,
        path: '/about',
    }
]

export default function NavDrawer() {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const {isMobile, isOpenDrawer, setIsOpenDrawer} = useContext(UIContext)

    const goToPage = (page) => {
        history.push(`${page.path}`)

        if (isMobile) {
            setIsOpenDrawer(false)
        }
    }

    return (
        <Drawer
            variant={isMobile ? 'temporary' : 'persistent'}
            anchor='left'
            classes={{
                root: clsx(classes.root, !isOpenDrawer && classes.close),
                paper: classes.paper,
            }}
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
        >
            <Typography className={classes.menuTitle} color='textSecondary' variant='overline'>
                MENU
            </Typography>
            <List disablePadding>
                {pages.map(page =>
                    <DrawerItem
                        key={page.path}
                        text={page.title}
                        icon={page.icon}
                        onClick={() => goToPage(page)}
                        isSelected={page.path === location.pathname}
                    />
                )}
            </List>

            <Typography className={classes.menuTitle} color='textSecondary' variant='overline'>
                SUPPORT
            </Typography>

            <List disablePadding>
                {supportPages.map(page =>
                    <DrawerItem
                        key={page.path}
                        text={page.title}
                        icon={page.icon}
                        onClick={() => goToPage(page)}
                        isSelected={page.path === location.pathname}
                    />
                )}
            </List>

        </Drawer>
    )

}