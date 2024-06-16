import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

import Router from './Router';
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
      <GameProvider>
        <Router />
      </GameProvider>
    </ThemeProvider>
  );
}
