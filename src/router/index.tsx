import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Path } from './path.ts'
import { Layout } from '../components/Layout'
import Discover from '../pages/Discover.tsx'
import Me from '../pages/Me.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: Path.Root,
        element: <Navigate to={Path.Discover} replace />,
      },
      {
        path: Path.Discover,
        element: <Discover />,
      },
      {
        path: Path.Me,
        element: <Me />,
      },
    ],
  },
])
