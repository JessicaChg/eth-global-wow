import { FC } from 'react'
import { Box, BoxProps, Flex, Icon, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../assets/png/background.jpeg'
import { ReactComponent as GalaxySVG } from '../assets/svg/galaxy.svg'
import { ReactComponent as LogoSVG } from '../assets/svg/logo.svg'
import { ConnectButton } from '../components/ConnectButton'
import { Path } from '../router/path.ts'

import { ReactComponent as StarSVG } from '../assets/svg/star-root.svg'

export const Star: FC<BoxProps & { name: string }> = ({ name, ...props }) => (
  <Box
    as={Link}
    to={`${Path.Discover}/${name}`}
    w="45px"
    h="45px"
    pos="absolute"
    top="10%"
    left="10%"
    zIndex={4}
    {...props}
  >
    <Box
      pos="absolute"
      top="-15px"
      fontSize="10px"
      h="10px"
      w="full"
      textAlign="center"
    >
      {name}
    </Box>
    <Icon as={StarSVG} w="45px" h="45px" />
  </Box>
)

const DiscoverRoot: FC = () => {
  const stars = [
    {
      name: 'L2',
      top: '42%',
      left: '10%',
    },
    {
      name: 'ZK',
      top: '34%',
      left: '37%',
    },
    {
      name: 'DeFi',
      top: '25%',
      left: '70%',
    },
    {
      name: 'Meme',
      top: '50%',
      left: '73%',
    },
    {
      name: 'Game',
      top: '57%',
      left: '55%',
    },
    {
      name: 'NFT',
      top: '65%',
      left: '20%',
    },
  ]

  return (
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
      {stars.map((star) => (
        <Star {...star} />
      ))}
    </Flex>
  )
}

export default DiscoverRoot
