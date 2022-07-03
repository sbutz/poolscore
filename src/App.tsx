import { CssBaseline, ThemeProvider, createTheme, } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DisciplineSelect from './DisciplineSelect';
import Game from './Game';
import { Store } from './Store';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Store>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DisciplineSelect/>} />
            <Route path="/game" element={<Game/>} />
          </Routes>
        </BrowserRouter>
      </Store>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;