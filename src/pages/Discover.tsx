import { FC } from 'react'

import { Flex } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { DiscoverFeed } from '../components/DiscoverFeed'
import { NavigationBar } from '../components/NavigationBar'

const Discover: FC = () => {
  const params = useParams<{ name: string }>()

  return (
    <Flex w="full" h="full" direction="column">
      <NavigationBar>{params.name}</NavigationBar>
      <DiscoverFeed h="calc(100% - 68px)" />
    </Flex>
  )
}

export default Discover
