import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,
} from 'react-router-dom';

import ErrorPage from './views/ErrorPage';
import Game from './views/Game';
import Game14 from './views/Game14';
import Tables from './views/Tables';
import Club from './views/Club';
import Matchdays from './views/Matchdays';
import Matchday from './views/Matchday';
import Login from './views/Login';
import Register from './views/Register';
import ThirdParty from './views/ThirdParty';
import RequireLogin from './components/RequireLogin';

export default function Router() {
  const router = createBrowserRouter(
    /* Keep in Sync with AppDrawer */
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game14" element={<Game14 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/club" element={<RequireLogin><Club /></RequireLogin>} />
        <Route path="/tables" element={<RequireLogin><Tables /></RequireLogin>} />
        <Route path="/matchday" element={<RequireLogin><Matchdays /></RequireLogin>} />
        <Route path="/matchday/:id" element={<RequireLogin><Matchday /></RequireLogin>} />
        <Route path="/thirdparty" element={<ThirdParty />} />
        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );

  return <RouterProvider router={router} />;
}
