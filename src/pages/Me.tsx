import { FC } from 'react'
import { Center, Heading, Icon } from '@chakra-ui/react'

import { ReactComponent as MeSVG } from '../assets/svg/me.svg'

const Me: FC = () => (
  <Center w="full" flexDirection="column" color="pink.500">
    <Icon as={MeSVG} w="48px" h="48px" />
    <Heading textAlign="center" w="full">
      Coming soon
    </Heading>
  </Center>
)

export default Me
