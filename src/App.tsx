import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

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
          <Router />
        </GameProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
