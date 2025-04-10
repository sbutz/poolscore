import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Router from './Router';
import AuthProvider from './store/AuthProvider';
import GameProvider from './store/GameProvider';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <GameProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router />
          </LocalizationProvider>
        </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
