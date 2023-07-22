import { FC } from 'react'
import { Box, BoxProps, Flex, HStack, Icon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
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

export const BottomNavigationBar: FC = () => (
  <HStack
    pos="absolute"
    bottom="48px"
    left="50%"
    transform="translateX(-50%)"
    spacing="24px"
    py="2"
    px="8"
    border="1px solid #FF3389"
    rounded="full"
    zIndex={2}
    bg="#161616"
  >
    <Item name="Discover" to={Path.Discover} color="#EE609C">
      <Icon w="32px" h="32px" as={DiscoverSVG} />
    </Item>
    <Item name="Me" to={Path.Me}>
      <Icon w="32px" h="32px" as={MeSVG} />
    </Item>
  </HStack>
)
