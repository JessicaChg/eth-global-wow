import type { FC } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Image,
  Flex,
} from '@chakra-ui/react'

import { ConnectWalletDialog } from './ConnectWalletDialog.tsx'
import { truncateMiddle } from '../../utils/string.ts'

export const ConnectButton: FC = () => {
  const { address, isConnected } = useAccount()

  const connectWalletDialog = useDisclosure()
  const { disconnect } = useDisconnect()

  if (isConnected)
    return (
      <Menu>
        <MenuButton as={Button} variant="unstyled">
          <Box
            h="40px"
            p="1px"
            bg="linear-gradient(90deg, #EE609C 0%, #5157FF 100%)"
            rounded="full"
          >
            <Box p="4px" pr="24px" bg="#000" w="full" h="full" rounded="full">
              <Flex
                as="span"
                bg="linear-gradient(90deg, #EE609C 0%, #5157FF 100%)"
                bgClip="text"
                lineHeight="32px"
              >
                <Image
                  src="https://app.relationlabs.ai/icon/avatar/avatar20.png"
                  w="30px"
                  h="30px"
                  rounded="full"
                  mr="10px"
                  border="1px solid #fff"
                />
                {truncateMiddle(address)}
              </Flex>
            </Box>
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    )

  return (
    <>
      <ConnectWalletDialog
        isOpen={connectWalletDialog.isOpen}
        onClose={connectWalletDialog.onClose}
      />
      <Box
        h="40px"
        p="1px"
        bg="linear-gradient(90deg, #EE609C 0%, #5157FF 100%)"
        rounded="full"
        transition="50ms"
        _active={{
          transform: 'scale(0.95)',
        }}
      >
        <Button
          variant="unstyled"
          py={2}
          px={6}
          bg="#000"
          w="full"
          h="full"
          rounded="full"
          onClick={() => {
            connectWalletDialog.onOpen()
          }}
        >
          <Box
            as="span"
            bg="linear-gradient(90deg, #EE609C 0%, #5157FF 100%)"
            bgClip="text"
          >
            Connect Wallet
          </Box>
        </Button>
      </Box>
    </>
  )
}
