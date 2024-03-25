import { createTheme } from '@mui/material/styles';
import "@fontsource/open-sans" // Defaults to weight 400.


const theme = createTheme({
    palette: {
        primary: {
            main: 'rgb(22, 147, 171)', // Primary color
        },
        secondary: {
            main: 'rgb(208, 50, 39)', // Secondary color
        },
        third: {
            main: 'rgb(255, 253, 90)', // Third color
        },
    },
    typography: {
        fontFamily: 'Open Sans',
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': 'Open Sans',
            },
        },
    },
});

export default theme;
