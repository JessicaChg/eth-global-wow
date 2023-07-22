import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Path } from './path.ts'
import { Layout } from '../components/Layout'
import Discover from '../pages/Discover.tsx'
import Me from '../pages/Me.tsx'
import DiscoverRoot from '../pages/DiscoverRoot.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: Path.Root,
        element: <Navigate to={Path.Discover} />,
      },
      {
        path: Path.Discover,
        element: <DiscoverRoot />,
      },
      {
        path: Path.DiscoverDetail,
        element: <Discover />,
      },
      {
        path: Path.Me,
        element: <Me />,
      },
    ],
  },
])
