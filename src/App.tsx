import { CssBaseline, ThemeProvider, createTheme, } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

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

function Router() {
  const isAdmin = true;

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<DisciplineSelect/>} />
          <Route path="/game" element={<Game/>} />
          <Route path="/game14" element={<Game14/>} />
          {isAdmin ? <Route path="/club" element={<Club/>} /> : null}
          {isAdmin ? <Route path="/tables" element={<Tables/>} /> : null}
          {isAdmin ? <Route path="/matchdays" element={<MatchDays/>} /> : null}
          <Route path="*" element={<ErrorPage/>} />
        </Routes>
    </BrowserRouter>
  )
}

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