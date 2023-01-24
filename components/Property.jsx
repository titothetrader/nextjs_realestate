import Link from 'next/link'
import Image from 'next/image'
import { Box, Flex, Text, Avatar } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'

import DefaultImage from '../assets/images/house.jpg'
import { getBrokerData } from '../utils/fetchApi'
import axios from 'axios'

import { capitalize } from '../utils/stringUtils'

const Property = (props) => (
    <Link href={`/property/${props.property.property_id}`} passHref>
        <Flex flexWrap='wrap' w="420px" p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
            <Box>
                <Image 
                    src={props.property.primary_photo ? props.property.primary_photo.href : DefaultImage} 
                    alt="house"
                    width={400}
                    height={260}
                />
            </Box>
            <Box w="full">
                <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                    <Flex alignItems="center">
                        <Box paddingRight="3" color="green.400">{props.property.flags.is_new_construction && <GoVerified />}</Box>
                        <Text fontWeight="bold" fontSize="lg">${millify(props.property.list_price)} {props.property.status === 'for_rent' ? '/ month' : ''}</Text>
                    </Flex>
                    <Box>
                        {/* <Avatar size="sm" src={''}/> */}
                        <Text>{props.property.branding[0]?.name}</Text>
                    </Box>
                </Flex>
                <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                    {props.property.description.beds ? props.property.description.beds : '?' } <FaBed /> | {props.property.description.baths ? props.property.description.baths : '?'} <FaBath /> | {props.property.description.sqft} sqft <BsGridFill />
                </Flex>
                <Text fontSize="lg">
                    {capitalize(props.property.description.type)} {props.property.description.sub_type && capitalize(props.property.description.sub_type)} in {props.property.location.address.city}
                </Text>
            </Box>  
        </Flex>
    </Link>
)

export default Property

