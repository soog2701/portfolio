import { createMuiTheme } from '@material-ui/core/styles';
// import amber from '@material-ui/core/colors/pink';

const theme = createMuiTheme({    
    palette: {
        primary: {
            main: '#ffab40',
            light: '#ffdd71',
            dark: '#c77c02',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#fff8e1',
            light: '#ffffff',
            dark: '#ccc5af',
            contrastText: '#ffcc00',
        },
    },
    typography: {
        useNextVariants: true,
    },
});

export { theme }