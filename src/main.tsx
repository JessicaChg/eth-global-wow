import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider as JotaiProvider } from 'jotai'
import { QueryClient, QueryClientProvider } from 'react-query'

import './styles/index.css'
import '@fontsource-variable/space-grotesk'

import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { router } from './router'

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

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <JotaiProvider>
          <ChakraProvider theme={theme}>
            <RouterProvider router={router} />
          </ChakraProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>
)
