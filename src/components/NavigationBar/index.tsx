import { FC } from 'react'
import { Box, BoxProps, Center, Flex, Icon } from '@chakra-ui/react'
import { ReactComponent as BackSVG } from '../../assets/svg/back.svg'

export const NavigationBar: FC<BoxProps> = ({ children }) => (
  <Flex w="full" h="68px" align="center" px={4} pt="20px">
    <Center w="48px" h="48px" bg="rgba(255, 255, 255, 0.05)" rounded="full">
      <Icon as={BackSVG} w="24px" h="24px" />
    </Center>
    <Box textAlign="right" lineHeight="18px" fontWeight={700} flex={1}>
      {children}
    </Box>
  </Flex>
)
