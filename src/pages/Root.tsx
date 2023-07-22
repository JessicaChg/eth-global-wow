import { FC } from 'react'
import { Flex, Icon, Image } from '@chakra-ui/react'
import { BottomNavigationBar } from '../components/BottomNavigationBar'
import BackgroundImage from '../assets/png/background.jpeg'
import { ReactComponent as GalaxySVG } from '../assets/svg/galaxy.svg'

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
      zIndex={0}
    />
    <Icon
      w="full"
      h="auto"
      as={GalaxySVG}
      pos="absolute"
      zIndex={1}
      top="15%"
      left="0"
    />
    <BottomNavigationBar />
  </Flex>
)

export default Root
