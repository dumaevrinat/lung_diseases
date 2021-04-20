import React, {useEffect, useState} from 'react'
import {Provider} from 'react-redux'
import store from '../../store'
import UIContext from '../../context'
import {ThemeProvider} from '@material-ui/styles'
import {makeStyles, responsiveFontSizes} from '@material-ui/core/styles'
import {theme} from '../../theme'
import {Switch, Redirect, Route, BrowserRouter} from 'react-router-dom'
import {Grow, useMediaQuery} from '@material-ui/core'
import NavDrawer from '../NavDrawer'
import {SnackbarProvider} from 'notistack'
import Notifier from '../Notifier'
import Header from '../Header'
import clsx from 'clsx'
import HomePage from '../Pages/HomePage'
import PredictionPage from '../Pages/PredictionPage'
import SettingsPage from '../Pages/SettingsPage'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
        padding: theme.spacing(2, 4, 4, 4),
    },
    mobilePadding: {
        padding: theme.spacing(0, 2)
    }
}))

const App = () => {
    const classes = useStyles()

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        noSsr: true,
    })

    const [isOpenDrawer, setIsOpenDrawer] = useState(() => !isMobile)

    useEffect(() => {
        if (!isMobile) {
            setIsOpenDrawer(true)
        }
    }, [isMobile])

    return (
        <Provider store={store}>
            <ThemeProvider theme={responsiveFontSizes(theme)}>
                <SnackbarProvider
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    TransitionComponent={Grow}
                >
                    <UIContext.Provider value={{isOpenDrawer, setIsOpenDrawer, isMobile}}>
                        <BrowserRouter>
                            <div className={classes.root}>
                                <NavDrawer/>
                                <Notifier/>
                                <div className={clsx(classes.page, isMobile && classes.mobilePadding)}>
                                    <Header/>
                                    <Switch>
                                        <Route
                                            path={'/'}
                                            exact
                                            component={HomePage}
                                        />
                                        <Route
                                            path={'/prediction'}
                                            exact
                                            component={PredictionPage}
                                        />
                                        <Route
                                            path={'/settings'}
                                            exact
                                            component={SettingsPage}
                                        />
                                        <Redirect from={'/*'} to={'/'}/>
                                    </Switch>
                                </div>
                            </div>
                        </BrowserRouter>
                    </UIContext.Provider>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default App
