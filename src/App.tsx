import { CssBaseline, ThemeProvider, createTheme, } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Store } from './store/Store';
import ErrorPage from './views/ErrorPage';
import DisciplineSelect from './views/DisciplineSelect';
import Game from './views/Game';
import Game14 from './views/Game14';
import Tables from './views/Tables';
import Club from './views/Club';
import MatchDays from './views/MatchDays';

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
        <Store>
          <Routes>
            <Route path="/" element={<DisciplineSelect/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/game14" element={<Game14/>} />
            {isAdmin ? <Route path="/club" element={<Club/>} /> : null}
            {isAdmin ? <Route path="/tables" element={<Tables/>} /> : null}
            {isAdmin ? <Route path="/matchdays" element={<MatchDays/>} /> : null}
            <Route path="*" element={<ErrorPage/>} />
          </Routes>
        </Store>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;