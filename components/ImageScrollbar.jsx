import { useContext } from 'react'
import Image from 'next/image'
import { Box, Icon, Flex } from '@chakra-ui/react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa'

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext)

    return (
        <Flex justifyContent="center" alignItems="center" marginRight="1">
            <Icon 
                as={FaArrowAltCircleLeft}
                onClick={() => scrollPrev()}
                fontSize="2xl"
                cursor="pointer"
            />
        </Flex>
    )
}

const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext)

    return (
        <Flex justifyContent="center" alignItems="center" marginRight="1">
            <Icon 
                as={FaArrowAltCircleRight}
                onClick={() => scrollNext()}
                fontSize="2xl"
                cursor="pointer"
            />
        </Flex>
    )
}

const ImageScrollbar = ({ data }) => (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow: 'hidden'}} justifyContent="center" alignItems="center">
        {data.map((image, i) => (
            <Box width="910px" itemID={i} key={i} padding="1">
                <Image 
                    alt="photo"
                    placeholder="blur" 
                    blurDataURL={image.href} 
                    src={image.href} 
                    width={1000} 
                    height={500}
                    sizes="(max-width:500px) 100px, (max-width:1023px) 400px, 1000px"
                />
            </Box>
        ))}
    </ScrollMenu>
)

export default ImageScrollbar