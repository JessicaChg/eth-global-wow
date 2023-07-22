import { FC } from 'react'
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  VStack,
  Image,
  Flex,
} from '@chakra-ui/react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { useConnect } from 'wagmi'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import MetamaskPNG from '../../assets/png/metamask.png'
import WalletConnectPNG from '../../assets/png/walletConnect.png'

const walletConnectConnector = new WalletConnectConnector({
  options: {
    projectId: '7bdc76b009f7ebf530a2ecd06711ed73',
  },
})
const metamaskConnector = new MetaMaskConnector()

export interface ConnectWalletDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface ItemProps {
  name: string
  icon: string
  connector: any
  onClose: () => void
}

const Item: FC<ItemProps> = ({ name, icon, connector, onClose }) => {
  const connect = useConnect({
    connector,
  })

  return (
    <Button
      w="full"
      bg="rgba(255, 255, 255, 0.15)"
      rounded="12px"
      display="flex"
      variant="unstyled"
      justifyContent="flex-start"
      p="12px"
      h="48px"
      isDisabled={connect.isLoading}
      _hover={{
        bg: 'rgba(255, 255, 255, 0.15)',
      }}
      _disabled={{
        bg: 'rgba(255, 255, 255, 0.15)',
      }}
      onClick={() => {
        onClose()
        connect.connect()
      }}
    >
      <Image
        src={icon}
        w="28px"
        h="28px"
        rounded="8px"
        mr="12px"
        bg="#E9E9E9"
      />
      {name}
      {connect.isLoading ? (
        <Spinner w="16px" h="16px" my="auto" ml="12px" />
      ) : null}
    </Button>
  )
}

export const ConnectWalletDialog: FC<ConnectWalletDialogProps> = ({
  isOpen,
  onClose,
}) => (
  <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
    <DrawerOverlay />
    <DrawerContent
      bg="rgba(0, 0, 0, 0)"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        direction="column"
        bg="#3A3A3A"
        px="30px"
        py="24px"
        roundedTop="20px"
        h="315px"
        w="full"
        maxW="500px"
      >
        <DrawerHeader
          textAlign="center"
          fontSize="18px"
          fontWeight={700}
          color="#F9D54A"
        >
          Connect account
        </DrawerHeader>
        <VStack spacing="8px">
          <Item
            name="Metamask"
            connector={metamaskConnector}
            icon={MetamaskPNG}
            onClose={onClose}
          />
          <Item
            name="WalletConnect"
            connector={walletConnectConnector}
            icon={WalletConnectPNG}
            onClose={onClose}
          />
        </VStack>
      </Flex>
    </DrawerContent>
  </Drawer>
)
