import { Box } from "@chakra-ui/react"

let date = new Date().getFullYear() 

const Footer = () => (
    <Box textAlign="center" p="5" color="gray.600" borderTop="1px" borderColor="gray.100">
        {date} Realtor, Inc.
    </Box>
)

export default Footer