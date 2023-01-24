import Head from 'next/head'
import { Box } from '@chakra-ui/react'

import Navbar from './Navbar'
import Footer from './Footer'

const Layout =(props) => (
    <>
        <Head>
            <title>Real Estate</title>
        </Head>
        <Box maxWidth="1280px" m="auto">
            <header>
                <Navbar />
            </header>
            <main>
                {props.children}
            </main>
            <footer>
                <Footer />
            </footer>
        </Box>
    </>
)

export default Layout