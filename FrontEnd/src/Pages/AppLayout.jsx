import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'

const AppLayout = () => {
  return (
    <Grid templateColumns="repeat(6,1fr)" bg="gray.50">
      <GridItem
      as="aside"
      colSpan={{ base: 6 , lg : 1}}
      minH={{lg: "100vh"}}
      bg="gray.800"
      >
        <Header className='header' />
      </GridItem>
      <GridItem
      minH="100vh"
      colSpan={{ base : 6 , lg : 5}}
      >
        <Outlet />
      </GridItem>
 
    </Grid>
  )
} 

export default AppLayout
