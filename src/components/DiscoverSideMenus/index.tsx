import { FC } from 'react'
import { Button, VStack } from '@chakra-ui/react'
import { ChatIcon, StarIcon } from '@chakra-ui/icons'

export const DiscoverSideMenus: FC = () => (
  <VStack pos="absolute" top="50%" right={0} px={2}>
    <Button>❤️</Button>
    <Button>
      <ChatIcon />
    </Button>
    <Button>
      <StarIcon />
    </Button>
  </VStack>
)
