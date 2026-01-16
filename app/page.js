import { Grid, GridItem } from '@chakra-ui/react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Grid templateColumns={"repeat(6, 1fr)"} minH="100vh">
        <GridItem colSpan={"1"}>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={"5"}>
          <Navbar />
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
}
