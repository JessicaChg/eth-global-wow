import { FC, useState } from 'react'
import { Button, Flex, Grid, Icon } from '@chakra-ui/react'
import { ReactComponent as HeartSVG } from '../../assets/svg/heart.svg'
import { ReactComponent as HeartActiveSVG } from '../../assets/svg/heart-active.svg'
import { ReactComponent as MessageSVG } from '../../assets/svg/messages.svg'
import { ReactComponent as StarSVG } from '../../assets/svg/star.svg'
import { ReactComponent as StarActiveSVG } from '../../assets/svg/star-active.svg'

export const DiscoverSideMenus: FC = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isStar, setIsStar] = useState(false)

  return (
    <Flex
      w="full"
      pos="absolute"
      bottom="0"
      right="0"
      zIndex={10}
      h="84px"
      bg="#000"
      pb={5}
      px={4}
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        w="full"
        h="full"
        py="14px"
        px="8px"
        sx={{
          button: {
            borderRight: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.10)',
            rounded: 0,
          },
          'button svg': {
            w: '32px',
            h: '32px',
          },
          'button:last-child': {
            borderRight: 'none',
          },
        }}
      >
        <Button variant="unstyled" onClick={() => setIsLiked((l) => !l)}>
          <Icon as={isLiked ? HeartActiveSVG : HeartSVG} />
        </Button>
        <Button variant="unstyled" onClick={() => setIsStar((s) => !s)}>
          <Icon as={isStar ? StarActiveSVG : StarSVG} />
        </Button>
        <Button variant="unstyled">
          <Icon as={MessageSVG} />
        </Button>
      </Grid>
    </Flex>
  )
}
