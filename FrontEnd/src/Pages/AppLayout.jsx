import React from 'react'
import Header from '../Components/Header'
import { Outlet } from 'react-router-dom'
import { Grid, GridItem } from '@chakra-ui/react'

const AppLayout = () => {
  return (
    <Grid templateColumns="repeat(12,1fr)" bg="gray.50">
      <GridItem
      as="aside"
      colSpan={{ base: 12 , md : 1}}
      // minH={{lg: "100vh"}}
      bg="gray.800"
      marginBottom={{base : "1.5em" , lg: "oem"}}
      >
        <Header className='header' />
      </GridItem>
      <GridItem
      bg="gray.50"
      colSpan={{ base : 12 , md : 11}}
      >
        <Outlet />
      </GridItem>
 
    </Grid>
  )
} 

export default AppLayout
