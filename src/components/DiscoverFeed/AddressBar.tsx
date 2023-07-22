import { FC } from 'react'
import { Box, BoxProps, Icon, Tooltip, useClipboard } from '@chakra-ui/react'
import { truncateMiddle } from '../../utils/string.ts'
import { ReactComponent as CopySVG } from '../../assets/svg/copy-with-theme-color.svg'

export interface AddressBarProps extends Omit<BoxProps, 'children'> {
  address: string
}

export const AddressBar: FC<AddressBarProps> = ({ address, ...props }) => {
  const { onCopy, hasCopied } = useClipboard(address)
  return (
    <Tooltip
      label="Copied"
      isOpen={hasCopied}
      closeOnClick={false}
      placement="top"
      hasArrow
      px={4}
      py={2}
      rounded="full"
    >
      <Box
        as="button"
        fontSize="16px"
        fontWeight={500}
        lineHeight="150%"
        color="pink.500"
        mx="auto"
        h="10"
        w="185px"
        rounded="full"
        pos="relative"
        transition="50ms"
        _before={{
          content: '" "',
          pos: 'absolute',
          top: 0,
          left: 0,
          w: 'full',
          h: 'full',
          bg: 'linear-gradient(90deg, #EE609C 0%, #5157FF 100%)',
          rounded: 'full',
        }}
        _active={{
          transform: 'scale(0.95)',
        }}
        onClick={onCopy}
        {...props}
      >
        <Box
          pos="absolute"
          top="1px"
          left="1px"
          w="calc(100% - 2px)"
          h="calc(100% - 2px)"
          py={2}
          px={4}
          bg="#161616"
          rounded="full"
        >
          <Box
            as="span"
            bg="linear-gradient(90deg, #EE609C 0%, #5157FF 100%)"
            bgClip="text"
          >
            {truncateMiddle(address)}
          </Box>
          <Icon as={CopySVG} ml="5px" transform="translateY(2px)" />
        </Box>
      </Box>
    </Tooltip>
  )
}
