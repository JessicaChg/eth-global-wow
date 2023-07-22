import { createBrowserRouter } from 'react-router-dom'
import { Path } from './path.ts'
import { Layout } from '../components/Layout'
import Discover from '../pages/Discover.tsx'
import Me from '../pages/Me.tsx'
import Root from '../pages/Root.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: Path.Root,
        element: <Root />,
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
