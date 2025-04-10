import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,
} from 'react-router';

import ErrorPage from './views/ErrorPage';
import { Game, MatchdayGame } from './views/Game';
import RequireLogin from './components/RequireLogin';
import Login from './views/Login';
import Matchdays from './views/Matchdays';
import Games from './views/Games';
import MainLayout from './views/MainLayout';
import StreamOverlay from './views/Overlay/StreamOverlay';
import Matchday from './views/Matchday';
import NestedLayout from './views/NestedLayout';

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
        </Route>
        <Route element={<RequireLogin><NestedLayout /></RequireLogin>}>
          <Route path="/matchdays/:id" element={<Matchday />} />
        </Route>
        <Route path="/games/:id" element={<RequireLogin><MatchdayGame /></RequireLogin>} />
        <Route path="/matchdays/:id/overlay" element={<StreamOverlay />} />
        {/* Needs game id etc. */ }
        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );

  return <RouterProvider router={router} />;
}
