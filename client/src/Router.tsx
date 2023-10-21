import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from 'react-router-dom';

import ErrorPage from './views/ErrorPage';
import Game from './views/Game';
import Game14 from './views/Game14';
import Tables from './views/Tables';
import Matchdays from './views/Matchdays';
import Matchday from './views/Matchday';
import Login from './views/Login';
import Register from './views/Register';
import RequireLogin from './components/RequireLogin';
import Homepage from './views/Homepage';
import Legal from './views/Legal';

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Homepage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game14" element={<Game14 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tables" element={<RequireLogin><Tables /></RequireLogin>} />
        <Route path="/matchday" element={<RequireLogin><Matchdays /></RequireLogin>} />
        <Route path="/matchday/:id" element={<RequireLogin><Matchday /></RequireLogin>} />
        <Route path="/legal" element={<Legal />} />
        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );

  return <RouterProvider router={router} />;
}
