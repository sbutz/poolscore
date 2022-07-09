import { CssBaseline, ThemeProvider, createTheme, } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DisciplineSelect from './DisciplineSelect';
import Game from './Game';
import { Store } from './Store';
import Layout from './Layout';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Store>
          <Layout>
            <Routes>
              <Route path="/" element={<DisciplineSelect/>} />
              <Route path="/game" element={<Game/>} />
            </Routes>
          </Layout>
        </Store>
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;