import { useEffect, useState } from 'react';
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
import Register from './views/Register';
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
  const [user] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [claimLoading, setClaimLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    user.getIdTokenResult().then((result) => {
      setClaimLoading(false);
      if (result.claims.role && result.claims.role === 'admin') setIsAdmin(true);
    });
  }, [user]);

  if (claimLoading) return null;
  if (!isAdmin) return <Navigate to="/login" replace />;

  return <RequireLogin>{children}</RequireLogin>;
}

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game14" element={<Game14 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
