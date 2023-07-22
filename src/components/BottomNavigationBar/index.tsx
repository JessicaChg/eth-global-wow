import { FC } from 'react'
import { Box, BoxProps, Flex, HStack, Icon, Center } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { useAccount } from 'wagmi'
import { Path } from '../../router/path.ts'
import { ReactComponent as DiscoverSVG } from '../../assets/svg/discover.svg'
import { ReactComponent as MeSVG } from '../../assets/svg/me.svg'

const Item: FC<{ to: string; name: string } & BoxProps> = ({
  to,
  name,
  children,
  ...props
}) => (
  <Flex as={Link} to={to} direction="column" align="center" w="60px" {...props}>
    {children}
    <Box as="span" fontSize="10px" fontWeight={500} mt="1">
      {name}
    </Box>
  </Flex>
)

export const BottomNavigationBar: FC = () => {
  const { pathname } = useLocation()
  const { address, isConnected } = useAccount()

  if (!address || !isConnected) return null

  if (!([Path.Discover, Path.Me] as string[]).includes(pathname)) {
    return null
  }

  return (
    <Center
      bg="linear-gradient(90deg, #EE609C 0%, #5157FF 100%)"
      pos="absolute"
      bottom="48px"
      left="50%"
      transform="translateX(-50%)"
      rounded="full"
      p="1px"
    >
      <HStack
        w="full"
        h="full"
        rounded="full"
        py="2"
        px="8"
        spacing="24px"
        zIndex={2}
        bg="#161616"
      >
        <Item
          name="Discover"
          to={Path.Discover}
          style={{ color: Path.Discover === pathname ? '#EE609C' : undefined }}
        >
          <Icon w="32px" h="32px" as={DiscoverSVG} />
        </Item>
        <Item
          name="Me"
          to={Path.Me}
          style={{ color: Path.Me === pathname ? '#EE609C' : undefined }}
        >
          <Icon w="32px" h="32px" as={MeSVG} />
        </Item>
      </HStack>
    </Center>
  )
}
