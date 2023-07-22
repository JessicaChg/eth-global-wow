import { FC } from 'react'
import {
  Box,
  Center,
  Flex,
  Image,
  Spinner,
  Heading,
  Icon,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useQuery } from 'react-query'
import * as dayjs from 'dayjs'
import { QueryKey } from '../../constants/QueryKey'
import { useAPI } from '../../hooks/useAPI'
import { truncateMiddle } from '../../utils/string'
import { FeedItem, FeedItemType } from '../../api/Feed.interface'
import { ReactComponent as CopySVG } from '../../assets/svg/copy-with-theme-color.svg'

interface CardProps {
  id?: string
  onLoadData?: (id: FeedItem) => void
  isEnabled?: boolean
}

export const Card: FC<CardProps> = ({ id, isEnabled = true, onLoadData }) => {
  const api = useAPI()
  const { data, isLoading } = useQuery(
    [api, QueryKey.GetFeedItem, id],
    () => api.getFeedItem({ id }).then((res) => res.data),
    {
      onSuccess: (res) => {
        onLoadData?.(res)
        return res
      },
      enabled: isEnabled,
    }
  )

  if (isLoading || !isEnabled) {
    return (
      <Center w="full" h="full">
        <Spinner />
      </Center>
    )
  }

  if (!data) {
    return <>No Data</>
  }

  if (data.type === FeedItemType.User) {
    return <>No Data</>
  }

  return (
    <Flex w="full" h="auto" direction="column" pb="84px">
      <Flex w="full" h="120px" rounded="16px" overflow="hidden">
        <Image
          src={data.logo}
          w="full"
          h="full"
          bg="rgba(0, 0, 0, 0.5)"
          objectFit="cover"
          filter="blur(20px)"
          rounded="16px"
          transform="translate3d(0, 0, 0)"
        />
      </Flex>
      <Image
        src={data.logo}
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
      <Heading
        fontSize="20px"
        fontWeight={700}
        lineHeight="130%"
        mt="6"
        w="full"
        textAlign="center"
      >
        {data.title}
      </Heading>
      <Box
        fontSize="16px"
        fontWeight={500}
        lineHeight="150%"
        border="1px solid"
        borderColor="pink.500"
        color="pink.500"
        mx="auto"
        py={2}
        px={4}
        mt={2}
        rounded="full"
      >
        {truncateMiddle(data.address)}
        <Icon as={CopySVG} ml="5px" />
      </Box>
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
      <Flex mt={5} w="full">
        <Text fontWeight={300} fontSize="14px">
          {data.content || 'No Description'}
        </Text>
      </Flex>
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
          {data.relevantContent.map((item) => (
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
    </Flex>
  )
}
