import {createMuiTheme} from '@material-ui/core'

const defaultTheme = createMuiTheme();

export const theme = createMuiTheme({
    typography: {
        fontSize: 15,
        fontFamily: [
            'Poppins',
            'Helvetica',
            'Arial',
            'sans-serif',
        ].join(','),
        h5: {
            lineHeight: 1.235,
            letterSpacing: '0.00735em'
        }
    },
    mixins: {
        drawer: {
            minWidth: 260
        }
    },
    palette: {
        primary: {
            main: '#6200ea',
        },
        secondary: {
            main: '#ff80ab'
        }
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: defaultTheme.spacing(1),
            },
            contained: {
                color: defaultTheme.palette.getContrastText(defaultTheme.palette.grey[200]),
                backgroundColor: defaultTheme.palette.grey[200],
            }
        },
    },
})
