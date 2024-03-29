import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import Router from './Router';
import AuthProvider from './store/AuthProvider';
import ClubProvider from './store/ClubProvider';
import TableProvider from './store/TableProvider';
import GameProvider from './store/GameProvider';
import { Store } from './store/Store';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <ClubProvider>
            <TableProvider>
              <GameProvider>
                <Store>
                  <Router />
                </Store>
              </GameProvider>
            </TableProvider>
          </ClubProvider>
        </AuthProvider>
        <CssBaseline />
      </LocalizationProvider>
    </ThemeProvider>
  );
}
