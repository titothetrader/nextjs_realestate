import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react'
import { baseURL, fetchApi } from '../utils/fetchApi'
import Property from '../components/Property'

const Banner = ({ purpose, title1, title2, desc1, desc2, imageUrl, linkName, buttonText }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize='3xl' fontWeight="bold">{title1} <br/> {title2}</Text>
      <Text fontSize='lg' paddingTop="3" paddingBottom="3" color="gray.700">{desc1} <br/> {desc2}</Text>
      <Button fontSize='xl'>
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home(props) {

  return (
    <Box>
      <Banner 
        purpose={'RENT A HOME'}
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="... and more"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
        linkName="/search?purpose=for_rent"
        buttonText="Explore Renting"
      />

      <Flex flexWrap='wrap'>
        {props.propertiesForRent?.map((property) => (
          <Property  property={property} key={property.property_id}/>
        ))}
      </Flex>

      <Banner 
        purpose={'BUY A HOME'}
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="... and more"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
        linkName="/search?purpose=for_sale"
        buttonText="Explore Buying"
      />
      <Flex flexWrap='wrap'>
      {props.propertiesForSale?.map((property) => (
          <Property property={property} key={property.property_id}/>
        ))}
      </Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertiesForSale = await fetchApi(`${baseURL}/properties/v3/list`, 'for_sale', '28215', 10)
  const propertiesForRent = await fetchApi(`${baseURL}/properties/v3/list`, 'for_rent', '28215', 10)

  return {
    props: {
      propertiesForSale: propertiesForSale?.data?.home_search?.results,
      propertiesForRent: propertiesForRent?.data?.home_search?.results,
    }
  }
}