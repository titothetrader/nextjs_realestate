import { Box, Flex, Spacer, Text, Avatar } from '@chakra-ui/react'
import { FaBed, FaBath } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'

import { getPropertyData } from '../../utils/fetchApi'
import { capitalize } from '../../utils/stringUtils'
import ImageScrollbar from '../../components/ImageScrollbar'

const PropertyDetails = ({ propertyDetails }) => (
    <Box maxWidth="1000px" margin="auto" p="4">
        {propertyDetails?.photos && <ImageScrollbar data={propertyDetails?.photos}/>}
        <Box w="full" p="6">
            <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                <Box w="full">
                    <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
                        <Flex alignItems="center">
                            <Box paddingRight="3" color="green.400">
                                {propertyDetails?.flags.is_new_construction && <GoVerified />}
                            </Box>
                            <Text fontWeight="bold" fontSize="lg">${millify(propertyDetails?.list_price)} {propertyDetails?.status === 'for_rent' ? '/ month' : ''}</Text>
                        </Flex>
                        <Box>
                            {/* <Avatar size="sm" src={''}/> */}
                            <Text>{propertyDetails?.branding[0]?.name}</Text>
                        </Box>
                    </Flex>
                    <Flex alignItems="center" p="1" justifyContent="space-between" w="250px" color="blue.400">
                        {propertyDetails?.description.beds ? propertyDetails?.description.beds : '?' } <FaBed /> | {propertyDetails?.description.baths ? propertyDetails?.description.baths : '?'} <FaBath /> | {propertyDetails?.description.sqft} sqft <BsGridFill />
                    </Flex>
                    <Box marginTop="2">
                        <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                            {capitalize(propertyDetails?.description?.type)} {propertyDetails?.description?.sub_type && capitalize(propertyDetails?.description?.sub_type)} in {propertyDetails?.location.address.city}
                        </Text>
                        <Text>
                            {propertyDetails?.location?.address?.line}, {propertyDetails?.location?.address?.city}, {propertyDetails?.location?.address?.state_code} {propertyDetails?.location?.address?.postal_code}
                        </Text>
                    </Box>
                    <Box marginTop="2" marginBottom="2" lineHeight="2" color="gray.600">
                        {propertyDetails?.description?.text}
                    </Box>
                    <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
                        <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                            <Text>Type</Text>
                            <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                                {capitalize(propertyDetails?.description?.type)}
                            </Text>
                        </Flex>
                        <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
                            <Text>Purpose</Text>
                            <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                                {capitalize(propertyDetails?.status)}
                            </Text>
                        </Flex>
                        {propertyDetails?.description?.year_built && 
                            <Flex justifyContent="space-between" w="400px" borderBottom="1px"       borderColor="gray.100" p="3">
                                <Text>Year Built</Text>
                                <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                                {propertyDetails?.description?.year_built}
                            </Text>
                        </Flex>}
                        {propertyDetails?.description?.styles && 
                            <Flex justifyContent="space-between" w="400px" borderBottom="1px"       borderColor="gray.100" p="3">
                                <Text>Styles</Text>
                                <Text fontSize="lg" marginBottom="2" fontWeight="bold">
                                {propertyDetails?.description?.styles}
                            </Text>
                        </Flex>}
                    </Flex>
                    <Box>
                        {propertyDetails?.details && <Text fontSize="2xl" fontWeight="bold" marginTop="5" borderBottom="1px" borderColor="gray.100" p="3">Details</Text>}
                        {propertyDetails?.details.map((detail, i) => (
                            <Box key={i}>
                                <Text fontSize="xl" fontWeight="bold" marginTop="5">{detail.category}</Text>
                                <Flex flexWrap="wrap">
                                    {detail?.text?.map((desc, i) => (
                                        <Text key={i} color="blue.400" fontSize="l" p="2" m="1" bg="gray.200" borderRadius="5">{desc}</Text>
                                    ))}
                                </Flex>
                            </Box>
                        ))}
                    </Box>
                </Box>  
            </Flex>
        </Box>
    </Box>
)

export default PropertyDetails

export async function getServerSideProps({ params: { property_id }}) {
    const data = await getPropertyData(property_id)
    
    return {
        props: {
            propertyDetails: data?.data?.home
        }
    }
}
