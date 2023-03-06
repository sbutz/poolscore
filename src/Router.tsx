import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,
} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

import ErrorPage from './views/ErrorPage';
import Game from './views/Game';
import Game14 from './views/Game14';
import Tables from './views/Tables';
import Club from './views/Club';
import Matchdays from './views/Matchdays';
import Matchday from './views/Matchday';
import Login from './views/Login';
import { auth } from './store/Firebase';

interface RequireProps {
  children: JSX.Element;
}
function RequireLogin({ children } : RequireProps) {
  const [user, loading] = useAuthState(auth);

  if (!user && !loading) return <Navigate to="/login" replace />;

  return children;
}

function RequireAdmin({ children } : RequireProps) {
  const isAdmin = false;

  if (!isAdmin) return <Navigate to="/login" replace />;

  return <RequireLogin>{children}</RequireLogin>;
}

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<RequireLogin><Game /></RequireLogin>} />
        <Route path="/game14" element={<RequireLogin><Game14 /></RequireLogin>} />
        <Route path="/login" element={<Login />} />
        <Route path="/club" element={<RequireAdmin><Club /></RequireAdmin>} />
        <Route path="/tables" element={<RequireAdmin><Tables /></RequireAdmin>} />
        <Route path="/matchday" element={<RequireAdmin><Matchdays /></RequireAdmin>} />
        <Route path="/matchday/:id" element={<RequireAdmin><Matchday /></RequireAdmin>} />
        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );

  return <RouterProvider router={router} />;
}
