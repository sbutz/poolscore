import {
  createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider,
} from 'react-router-dom';

import ErrorPage from './views/ErrorPage';
import Game from './views/Game';

export default function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<ErrorPage />} />
      </>,
    ),
    {
      basename: process.env.PUBLIC_URL,
    },
  );

  return <RouterProvider router={router} />;
}
