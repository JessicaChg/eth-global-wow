import { FC } from 'react'
import { Flex, type FlexProps } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { use100vhInCssVariable } from '../../hooks/use100vh'

export const Layout: FC<FlexProps> = ({ children, ...props }) => {
  use100vhInCssVariable()
  return (
    <Flex
      mx="auto"
      w="full"
      h="var(--full-vh)"
      maxW="500px"
      direction="column"
      {...props}
    >
      <Flex
        w="full"
        overflowX="hidden"
        overflowY="hidden"
        sx={{
          '-webkit-overflow-scrolling': 'touch',
        }}
        flex={1}
      >
        {children || <Outlet />}
      </Flex>
    </Flex>
  )
}
