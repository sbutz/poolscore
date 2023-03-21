import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { Store } from './store/Store';
import Router from './Router';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Store>
          <Router />
        </Store>
        <CssBaseline />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
