import { FC } from 'react'
import { Box, BoxProps, Flex, Icon, Image, keyframes } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../assets/png/background.jpeg'
import { ReactComponent as GalaxySVG } from '../assets/svg/galaxy.svg'
import { ReactComponent as LogoSVG } from '../assets/svg/logo.svg'
import { ConnectButton } from '../components/ConnectButton'
import { Path } from '../router/path.ts'

import DeFiPng from '../assets/png/DeFi.png'
import GamePng from '../assets/png/GAME.png'
import L2Png from '../assets/png/L2.png'
import MemePng from '../assets/png/MEME.png'
import ZKPng from '../assets/png/ZK.png'
import NFTPng from '../assets/png/NFT.png'

import { ReactComponent as StarSVG } from '../assets/svg/star-root.svg'

const breathingAnimation = keyframes`
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
`

export const Star: FC<
  BoxProps & { name: string; index?: number; img?: string }
> = ({ index = 0, name, img, ...props }) => (
  <Box
    as={Link}
    to={`${Path.Discover}/${name}`}
    w="65px"
    h="65px"
    pos="absolute"
    top="10%"
    left="10%"
    zIndex={4}
    animation={`${breathingAnimation} 5s ease-in-out infinite`}
    style={{
      animationDelay: `${index * 0.3}s`,
    }}
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
    {img ? (
      <Box border="1px solid rgba(255, 255, 255, 0.5)" p="6px" rounded="full">
        <Image src={img} w="full" h="full" objectFit="cover" rounded="full" />
      </Box>
    ) : (
      <Icon as={StarSVG} w="full" h="full" />
    )}
  </Box>
)

const DiscoverRoot: FC = () => {
  const stars = [
    {
      name: 'L2',
      top: '32%',
      left: '10%',
      img: L2Png,
    },
    {
      name: 'ZK',
      top: '24%',
      left: '37%',
      img: ZKPng,
    },
    {
      name: 'DeFi',
      top: '15%',
      left: '70%',
      img: DeFiPng,
    },
    {
      name: 'Meme',
      top: '44%',
      left: '78%',
      img: MemePng,
    },
    {
      name: 'Game',
      top: '50%',
      left: '55%',
      img: GamePng,
    },
    {
      name: 'NFT',
      top: '60%',
      left: '20%',
      img: NFTPng,
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
      {stars.map((star, index) => (
        <Star key={star.name} index={index} {...star} />
      ))}
    </Flex>
  )
}

export default DiscoverRoot
