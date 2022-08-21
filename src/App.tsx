import { CssBaseline, ThemeProvider, createTheme, } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DisciplineSelect from './DisciplineSelect';
import Game from './Game';
import Game14 from './Game14';
import Tables from './Tables';
import ErrorPage from './ErrorPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const isAdmin = true;
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path="/" element={<DisciplineSelect/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/game14" element={<Game14/>} />
            {isAdmin ? <Route path="/tables" element={<Tables/>} /> : null}
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;