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

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireLogin><MainLayout /></RequireLogin>}>
          <Route path="/games" element={<RequireLogin><Games /></RequireLogin>} />
          <Route path="/matchdays" element={<RequireLogin><Matchdays /></RequireLogin>} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );

  return <RouterProvider router={router} />;
}
