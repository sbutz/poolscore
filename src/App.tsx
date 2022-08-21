import { CssBaseline, ThemeProvider, createTheme, } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DisciplineSelect from './DisciplineSelect';
import Game from './Game';
import Game14 from './Game14';
import { Store } from './Store';
import { Store14 } from './Store14';
import ErrorPage from './ErrorPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Store>
      <Store14>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path="/" element={<DisciplineSelect/>} />
              <Route path="/game" element={<Game/>} />
              <Route path="/game14" element={<Game14/>} />
              <Route path="*" element={<ErrorPage/>} />
            </Routes>
        </BrowserRouter>
      </Store14>
      </Store>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;