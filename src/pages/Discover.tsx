import { FC } from 'react'

import { Flex } from '@chakra-ui/react'
import { DiscoverFeed } from '../components/DiscoverFeed'
import { NavigationBar } from '../components/NavigationBar'

const Discover: FC = () => (
  <Flex w="full" h="full" direction="column">
    <NavigationBar>Ethereum</NavigationBar>
    <DiscoverFeed h="calc(100% - 68px)" />
  </Flex>
)

export default Discover
