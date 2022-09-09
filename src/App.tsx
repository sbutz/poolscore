import { CssBaseline, ThemeProvider, createTheme, } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { Store } from './store/Store';
import ErrorPage from './views/ErrorPage';
import Game from './views/Game';
import Game14 from './views/Game14';
import Tables from './views/Tables';
import Club from './views/Club';
import Matchdays from './views/Matchdays';
import Matchday from './views/Matchday';

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
          <Route path="/" element={<Navigate to="/game" replace={true}/>}/>
          <Route path="/game" element={<Game/>} />
          <Route path="/game14" element={<Game14/>} />
          {isAdmin ? <Route path="/club" element={<Club/>} /> : null}
          {isAdmin ? <Route path="/tables" element={<Tables/>} /> : null}
          {isAdmin ? <Route path="/matchday" element={<Matchdays/>} /> : null}
          {isAdmin ? <Route path="/matchday/:id" element={<Matchday/>} /> : null}
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