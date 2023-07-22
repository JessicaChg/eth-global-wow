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
} from '@chakra-ui/react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import type { InjectedConnector } from 'wagmi/connectors/injected'
import { useConnect } from 'wagmi'
import MetamaskPNG from '../../assets/png/metamask.png'

const metamaskConnector = new MetaMaskConnector()

export interface ConnectWalletDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface ItemProps {
  name: string
  icon: string
  connector: InjectedConnector
}

const Item: FC<ItemProps> = ({ name, icon, connector }) => {
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
    <DrawerContent px="30px" py="24px" roundedTop="20px" h="315px">
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
        />
      </VStack>
    </DrawerContent>
  </Drawer>
)
