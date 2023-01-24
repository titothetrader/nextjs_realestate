import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'

import SearchFilters from '../components/SearchFilters'
import Property from '../components/Property'

import noresult from '../assets/images/noresult.svg'
import { baseURL, fetchApi } from '../utils/fetchApi'

const Search = (props) => {

 const [searchFilters, setSearchFilters] = useState(false)
 const router = useRouter()

 return (
    <Box>
        <Flex
            cursor="pointer"
            bg="gray.100"
            borderBottom="1px"
            borderColor="gray.200"
            p="2"
            fontWeight="black"
            fontSize="lg"
            justifyContent="center"
            alignItems="center"
            onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
        >
            <Text>Search Properties by Filters</Text>
            <Icon paddingLeft="2" w="7" as={BsFilter}/>
        </Flex>
        {searchFilters && <SearchFilters />}
        <Text fontSize="2xl" p="4" fontWeight="bold">
            Properties {router.query.purpose}
        </Text>
        <Flex flexWrap="wrap">
            {props.properties?.map((property) => <Property property={property} key={property.property_id}/>)}
        </Flex>
        {props.properties?.length === 0 && (
            <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
                <Image src={noresult} alt="no result"/>
                <Text fontSize="2xl" marginTop="3">No Results Found</Text>
            </Flex>
        )}
    </Box>
 )

}

export default Search

export async function getServerSideProps({ query }) {
    const purpose = query?.purpose || 'for_rent'
    const minPrice = query?.minPrice || 0
    const maxPrice = query?.maxPrice || 100000000
    const bedsMin = query?.bedsMin || 0
    const bathsMin = query?.bathsMin || 0
    const sort = query?.sort || 'desc'
    const sortBy = query?.sortBy || 'list_date'
    const areaMin = query?.areaMin || 0
    const areaMax = query?.areaMax || 10000000

    console.log(bathsMin)
    const searchData = await fetchApi(`${baseURL}/properties/v3/list`, purpose, '28215', 10, minPrice, maxPrice, bedsMin, bathsMin, sort, sortBy, areaMin, areaMax)

    return {
      props: {
        properties: searchData?.data?.home_search?.results
      }
    }
  }