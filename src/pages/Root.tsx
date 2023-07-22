import { FC } from 'react'
import { Flex, Image } from '@chakra-ui/react'
import { BottomNavigationBar } from '../components/BottomNavigationBar'
import BackgroundImage from '../assets/png/background.jpeg'

const Root: FC = () => (
  <Flex w="full" h="full" pos="relative">
    <Image
      src={BackgroundImage}
      pos="absolute"
      top="0"
      left="0"
      w="full"
      h="full"
      objectFit="cover"
    />
    <BottomNavigationBar />
  </Flex>
)

export default Root
