import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,
} from 'react-router-dom';

import ErrorPage from './views/ErrorPage';
import Game from './views/Game';
import RequireLogin from './components/RequireLogin';
import Login from './views/Login';
import Matchdays from './views/Matchdays';
import Games from './views/Games';
import MainLayout from './views/MainLayout';
import StreamOverlay from './views/StreamOverlay';
import Matchday from './views/Matchday';

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireLogin><MainLayout /></RequireLogin>}>
          <Route path="/games" element={<Games />} />
          <Route path="/matchdays" element={<Matchdays />} />
          <Route path="/matchdays/:id" element={<Matchday />} />
        </Route>
        {/* Needs game id etc. */ }
        <Route path="/overlay" element={<StreamOverlay />} />
        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );

  return <RouterProvider router={router} />;
}
