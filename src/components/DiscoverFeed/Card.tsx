import type { FC } from 'react'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import {
  FeedItem,
  FeedItemType,
  FeedProjectItem,
  FeedUserItem,
} from '../../api/Feed.interface'
import { ReactComponent as Heart2SVG } from '../../assets/svg/heart-2.svg'
import { ReactComponent as TwitterSVG } from '../../assets/svg/twitter.svg'
import { ReactComponent as DiscordSVG } from '../../assets/svg/discord.svg'
import { ReactComponent as GithubSVG } from '../../assets/svg/github.svg'
import { ReactComponent as TelegramSVG } from '../../assets/svg/telegram.svg'
import { ReactComponent as EnsSVG } from '../../assets/svg/ens.svg'
import { ReactComponent as MirrorSVG } from '../../assets/svg/mirror.svg'
import { AddressBar } from './AddressBar.tsx'

const socialIconMap: Record<string, any> = {
  twitter: TwitterSVG,
  discord: DiscordSVG,
  telegram: TelegramSVG,
  github: GithubSVG,
  ens: EnsSVG,
  mirror: MirrorSVG,
}

interface CardProps {
  data: FeedItem
}

export const Card: FC<CardProps> = ({ data }) => {
  const avatar = (data as FeedUserItem).avatar || (data as FeedProjectItem).logo
  return (
    <Flex w="full" h="auto" direction="column" pb="84px">
      <Flex
        w="full"
        h="120px"
        rounded="16px"
        overflow="hidden"
        pos="relative"
        zIndex={0}
      >
        <Image
          src={avatar}
          w="full"
          h="full"
          bg="rgba(0, 0, 0, 0.5)"
          objectFit="cover"
          filter="blur(50px) brightness(1.5)"
          rounded="16px"
          transform="translateZ(0) scale(1.5)"
        />
      </Flex>
      <Image
        src={avatar}
        w="102px"
        h="102px"
        rounded="100%"
        border="2px solid #fff"
        objectFit="cover"
        mx="auto"
        mt="-72px"
        pos="relative"
        bg="gray.800"
        zIndex={1}
        transform="translate3d(0, 0, 0)"
      />
      {(data as FeedProjectItem).title ? (
        <Heading
          fontSize="20px"
          fontWeight={700}
          lineHeight="130%"
          mt="6"
          w="full"
          textAlign="center"
        >
          {(data as FeedProjectItem).title}
        </Heading>
      ) : null}
      <AddressBar
        mt={data.type === FeedItemType.User ? 5 : 2}
        address={data.address}
      />
      <Flex wrap="wrap" w="full" mt="16px">
        {data.tags.map((tag) => (
          <Tag
            key={tag}
            mr={2}
            mb={2}
            px="14px"
            py={2}
            fontSize="12px"
            fontWeight={500}
            textTransform="capitalize"
            rounded="full"
            bg="rgba(255, 255, 255, 0.05)"
          >
            {tag}
          </Tag>
        ))}
      </Flex>
      {(data as FeedProjectItem).content ? (
        <Text
          fontWeight={300}
          fontSize="14px"
          whiteSpace="pre-line"
          mt={5}
          w="full"
        >
          {(data as FeedProjectItem).content || 'No Description'}
        </Text>
      ) : null}

      {(data as FeedUserItem).socialLinks?.length > 0 ? (
        <Flex mt={6} w="full" direction="column">
          <Heading
            fontSize="14px"
            fontWeight={700}
            pos="relative"
            mr="auto"
            mb="4"
          >
            Social Media
          </Heading>
          <Flex
            justify="space-between"
            align="center"
            py={2}
            px={4}
            h={10}
            rounded="full"
            bg="#222"
          >
            {(data as FeedUserItem).socialLinks
              .filter((e) => e.url && socialIconMap[e.type])
              .map((socialLink) => (
                <Box
                  key={socialLink.type + socialLink.url}
                  as="a"
                  href={socialLink.url}
                  w="6"
                  h="6"
                  minW="6"
                >
                  <Icon as={socialIconMap[socialLink.type]} w="6" h="6" />
                </Box>
              ))}
          </Flex>
        </Flex>
      ) : null}

      {(data as FeedUserItem).erc20?.length > 0 ? (
        <Flex
          mt={6}
          w="full"
          direction="column"
          my={8}
          p={5}
          rounded="14px"
          border="1px solid rgba(255, 255, 255, 0.05)"
        >
          <Flex
            justify="space-between"
            fontSize="16px"
            fontWeight={500}
            pb="14px"
            borderBottom="1px solid rgba(255, 255, 255, 0.05)"
          >
            <Box>Token</Box>
            <Box color="#F9D54A">More</Box>
          </Flex>
          <VStack mt="14px" spacing="14px" w="full">
            {(data as FeedUserItem).erc20.map((item) => (
              <HStack spacing="10px" w="full" key={item.symbol}>
                <Image
                  src={item.icon}
                  w="10"
                  h="10"
                  objectFit="cover"
                  rounded="8px"
                  fallback={
                    <Box
                      bg="rgba(255, 255, 255, 0.1)"
                      w="10"
                      h="10"
                      rounded="8px"
                    />
                  }
                />
                <VStack textAlign="left" spacing={0}>
                  <Text as="span" fontSize="14px" fontWeight={500} w="full">
                    {item.amount} {item.symbol}
                  </Text>
                  <Text as="span" fontSize="10px" w="full">
                    ${item.usdValue}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </Flex>
      ) : null}

      {(data as FeedUserItem).nft?.length > 0 ? (
        <Flex w="full" direction="column">
          <Flex
            justify="space-between"
            fontSize="16px"
            fontWeight={500}
            pb="14px"
          >
            <Box>NFT</Box>
            <Box color="#F9D54A">See All</Box>
          </Flex>
          <Flex
            w="full"
            overflowX="auto"
            overflowY="hidden"
            h="216px"
            scrollSnapType="x mandatory"
            sx={{
              '--item-width': '154px',
            }}
          >
            {(data as FeedUserItem).nft.map((item) => (
              <Flex
                key={`${item.tokenId}-${item.name}-${item.fullName}`}
                w="var(--item-width)"
                minW="var(--item-width)"
                mr="4"
                p="10px"
                direction="column"
                rounded="12px"
                bg="rgba(255, 255, 255, 0.05)"
                scrollSnapAlign="start"
              >
                <Image
                  src={item.imageUrl}
                  w="full"
                  objectFit="cover"
                  mb="8px"
                  rounded="8px"
                />
                <Heading
                  fontSize="12px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  w="full"
                  h="15px"
                  lineHeight="15px"
                >
                  {item.fullName}
                </Heading>
                <Box
                  as="span"
                  fontSize="10px"
                  mt="4px"
                  mb="10px"
                  h="13px"
                  lineHeight="13px"
                >
                  {item.name}
                </Box>
                <Flex justify="space-between" h="15px" lineHeight="15px">
                  <Box fontSize="10px" fontWeight={700}>
                    {item.price}
                  </Box>
                  <Box fontSize="12px" fontWeight={500}>
                    <Icon
                      as={Heart2SVG}
                      w="14px"
                      h="14px"
                      transform="translateY(3px)"
                    />
                    ️ {item.like}
                  </Box>
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Flex>
      ) : null}

      {(data as FeedProjectItem).relevantContent?.length > 0 ? (
        <Flex mt={8} direction="column">
          <Heading
            fontSize="14px"
            fontWeight={700}
            pos="relative"
            pb="6px"
            mr="auto"
            _after={{
              content: '" "',
              bg: '#F9D54A',
              pos: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              w: '32px',
              h: '2px',
              rounded: 'full',
            }}
          >
            Relevant content
          </Heading>
          <VStack mt="16px" spacing="10" w="full">
            {(data as FeedProjectItem).relevantContent.map((item) => (
              <Flex
                direction="column"
                w="full"
                key={`${item.createTime}-${item.name}`}
              >
                <Flex w="full" mb="14px">
                  <Image
                    src={item.avatar}
                    w="36px"
                    h="36px"
                    objectFit="cover"
                    mr="10px"
                  />
                  <Flex direction="column" h="36px">
                    <Box fontSize="14px">{item.name}</Box>
                    <Box color="#8C91A2" fontSize="12px">
                      {item.twitterName} -{' '}
                      {dayjs(item.createTime).format('MMM DD')}
                    </Box>
                  </Flex>
                </Flex>
                <Text fontSize="12px" fontWeight={400}>
                  {item.content}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Flex>
      ) : null}
    </Flex>
  )
}
