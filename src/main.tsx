import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClient, QueryClientProvider } from 'react-query'
import { router } from './router'

import './styles/index.css'
import '@fontsource-variable/space-grotesk'

const queryClient = new QueryClient()

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#161616',
        fontFamily: "'Space Grotesk Variable', sans-serif;",
      },
    },
  },
  fonts: {
    heading: "'Space Grotesk Variable', sans-serif;",
    body: "'Space Grotesk Variable', sans-serif;",
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ChakraProvider theme={theme}>
          <RouterProvider router={router} />
        </ChakraProvider>
      </JotaiProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
