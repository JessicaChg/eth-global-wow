import { FC } from 'react'
import { Flex, Icon, Image } from '@chakra-ui/react'
import { BottomNavigationBar } from '../components/BottomNavigationBar'
import BackgroundImage from '../assets/png/background.jpeg'
import { ReactComponent as GalaxySVG } from '../assets/svg/galaxy.svg'
import { ReactComponent as LogoSVG } from '../assets/svg/logo.svg'
import { ConnectButton } from '../components/ConnectButton'

const Root: FC = () => (
  <Flex w="full" h="full" pos="relative">
    <Flex
      h="72px"
      w="full"
      justify="space-between"
      pos="absolute"
      top="0"
      left="0"
      zIndex={1}
      px="5"
      py="4"
    >
      <Icon as={LogoSVG} w="82px" h="40px" />
      <ConnectButton />
    </Flex>
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
