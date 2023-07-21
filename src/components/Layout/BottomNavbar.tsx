import { FC } from 'react'
import { Box, Flex, Grid, Icon } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { Path } from '../../router/path.ts'

import { ReactComponent as DiscoverSVG } from '../../assets/svg/discover.svg'
import { ReactComponent as MeSVG } from '../../assets/svg/me.svg'

export const BottomNavbar: FC = () => {
  const { pathname } = useLocation()

  return (
    <Grid
      w="full"
      h="16"
      minH="16"
      pt="1"
      templateColumns="repeat(2, 1fr)"
      pos="sticky"
      bottom="0"
      bg="pink.800"
      fontSize="xl"
      zIndex={10}
      sx={{
        svg: {
          w: '6',
          h: '6',
        },
        '.item': {
          color: 'pink.100',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: 'sm',
          justifyContent: 'center',
          opacity: 0.4,
        },
        '.active': {
          opacity: 1,
        },
      }}
    >
      <Flex
        as={Link}
        to={Path.Discover}
        className={classNames('item', {
          active: pathname === Path.Discover,
        })}
      >
        <Icon as={DiscoverSVG} />
        <Box as="span">Discover</Box>
      </Flex>
      <Flex
        as={Link}
        to={Path.Me}
        className={classNames('item', {
          active: pathname === Path.Me,
        })}
      >
        <Icon as={MeSVG} />
        <Box as="span">Me</Box>
      </Flex>
    </Grid>
  )
}
